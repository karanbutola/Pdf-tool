import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { compress } from 'compress-pdf';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import sharp from 'sharp';
import { exec } from 'child_process';
import { promisify } from 'util';
import archiver from 'archiver';
import FileHistory from '../models/FileHistory.js';
import { deleteFile, deleteFiles } from '../utils/fileCleanup.js';

const execPromise = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to save file history
const saveFileHistory = async (userId, operation, fileName, fileSize, outputFileName, outputFileSize, status = 'success', errorMessage = null, processingTime = 0) => {
    try {
        await FileHistory.create({
            user: userId,
            operation,
            fileName,
            fileSize,
            outputFileName,
            outputFileSize,
            status,
            errorMessage,
            processingTime
        });
    } catch (error) {
        console.error('Error saving file history:', error);
    }
};

// @desc    Compress PDF
// @route   POST /api/pdf/compress
// @access  Private
export const compressPDF = async (req, res) => {
    const startTime = Date.now();
    let inputPath = null;
    let outputPath = null;

    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        inputPath = req.file.path;
        const outputFileName = `compressed-${Date.now()}.pdf`;
        outputPath = path.join(path.dirname(inputPath), outputFileName);

        // Compress PDF using compress-pdf library
        const buffer = await compress(inputPath, {
            resolution: req.body.resolution || 'ebook' // ebook, printer, screen, prepress
        });

        await fs.promises.writeFile(outputPath, buffer);

        const inputSize = req.file.size;
        const outputSize = fs.statSync(outputPath).size;
        const compressionRatio = ((1 - outputSize / inputSize) * 100).toFixed(2);
        const processingTime = Date.now() - startTime;

        // Save to history
        await saveFileHistory(
            req.user._id,
            'compress',
            req.file.originalname,
            inputSize,
            outputFileName,
            outputSize,
            'success',
            null,
            processingTime
        );

        // Send file
        res.download(outputPath, outputFileName, (err) => {
            if (err) console.error('Download error:', err);
            // Cleanup files after download
            setTimeout(() => {
                deleteFiles([inputPath, outputPath]);
            }, 1000);
        });

    } catch (error) {
        console.error('Compress PDF error:', error);

        await saveFileHistory(
            req.user._id,
            'compress',
            req.file?.originalname || 'unknown',
            req.file?.size || 0,
            null,
            null,
            'failed',
            error.message,
            Date.now() - startTime
        );

        if (inputPath) deleteFile(inputPath);
        if (outputPath) deleteFile(outputPath);

        res.status(500).json({
            success: false,
            message: 'Error compressing PDF',
            error: error.message
        });
    }
};

// @desc    Merge PDFs
// @route   POST /api/pdf/merge
// @access  Private
export const mergePDFs = async (req, res) => {
    const startTime = Date.now();
    const filePaths = [];
    let outputPath = null;

    try {
        if (!req.files || req.files.length < 2) {
            return res.status(400).json({ success: false, message: 'At least 2 PDF files required' });
        }

        req.files.forEach(file => filePaths.push(file.path));

        // Create merged PDF
        const mergedPdf = await PDFDocument.create();

        for (const filePath of filePaths) {
            const pdfBytes = await fs.promises.readFile(filePath);
            const pdf = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();
        const outputFileName = `merged-${Date.now()}.pdf`;
        outputPath = path.join(path.dirname(filePaths[0]), outputFileName);

        await fs.promises.writeFile(outputPath, mergedPdfBytes);

        const totalInputSize = req.files.reduce((sum, file) => sum + file.size, 0);
        const outputSize = fs.statSync(outputPath).size;
        const processingTime = Date.now() - startTime;

        await saveFileHistory(
            req.user._id,
            'merge',
            `${req.files.length} files`,
            totalInputSize,
            outputFileName,
            outputSize,
            'success',
            null,
            processingTime
        );

        res.download(outputPath, outputFileName, (err) => {
            if (err) console.error('Download error:', err);
            setTimeout(() => {
                deleteFiles([...filePaths, outputPath]);
            }, 1000);
        });

    } catch (error) {
        console.error('Merge PDFs error:', error);

        await saveFileHistory(
            req.user._id,
            'merge',
            `${req.files?.length || 0} files`,
            0,
            null,
            null,
            'failed',
            error.message,
            Date.now() - startTime
        );

        deleteFiles([...filePaths, outputPath].filter(Boolean));

        res.status(500).json({
            success: false,
            message: 'Error merging PDFs',
            error: error.message
        });
    }
};

// @desc    Convert Images to PDF
// @route   POST /api/pdf/image-to-pdf
// @access  Private
export const imageToPDF = async (req, res) => {
    const startTime = Date.now();
    const filePaths = [];
    let outputPath = null;

    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No images uploaded' });
        }

        req.files.forEach(file => filePaths.push(file.path));

        const pdfDoc = await PDFDocument.create();

        for (const imagePath of filePaths) {
            const imageBytes = await fs.promises.readFile(imagePath);
            let image;

            const ext = path.extname(imagePath).toLowerCase();
            if (ext === '.png') {
                image = await pdfDoc.embedPng(imageBytes);
            } else if (['.jpg', '.jpeg'].includes(ext)) {
                image = await pdfDoc.embedJpg(imageBytes);
            } else {
                // Convert other formats to PNG using sharp
                const pngBuffer = await sharp(imageBytes).png().toBuffer();
                image = await pdfDoc.embedPng(pngBuffer);
            }

            const page = pdfDoc.addPage([image.width, image.height]);
            page.drawImage(image, {
                x: 0,
                y: 0,
                width: image.width,
                height: image.height,
            });
        }

        const pdfBytes = await pdfDoc.save();
        const outputFileName = `images-to-pdf-${Date.now()}.pdf`;
        outputPath = path.join(path.dirname(filePaths[0]), outputFileName);

        await fs.promises.writeFile(outputPath, pdfBytes);

        const totalInputSize = req.files.reduce((sum, file) => sum + file.size, 0);
        const outputSize = fs.statSync(outputPath).size;
        const processingTime = Date.now() - startTime;

        await saveFileHistory(
            req.user._id,
            'image-to-pdf',
            `${req.files.length} images`,
            totalInputSize,
            outputFileName,
            outputSize,
            'success',
            null,
            processingTime
        );

        res.download(outputPath, outputFileName, (err) => {
            if (err) console.error('Download error:', err);
            setTimeout(() => {
                deleteFiles([...filePaths, outputPath]);
            }, 1000);
        });

    } catch (error) {
        console.error('Image to PDF error:', error);

        await saveFileHistory(
            req.user._id,
            'image-to-pdf',
            `${req.files?.length || 0} images`,
            0,
            null,
            null,
            'failed',
            error.message,
            Date.now() - startTime
        );

        deleteFiles([...filePaths, outputPath].filter(Boolean));

        res.status(500).json({
            success: false,
            message: 'Error converting images to PDF',
            error: error.message
        });
    }
};

// @desc    Convert PDF to Images
// @route   POST /api/pdf/pdf-to-image
// @access  Private
export const pdfToImage = async (req, res) => {
    const startTime = Date.now();
    let inputPath = null;
    let outputDir = null;

    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        inputPath = req.file.path;
        const format = req.body.format || 'png'; // png or jpg
        outputDir = path.join(path.dirname(inputPath), `pdf-images-${Date.now()}`);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Load PDF
        const pdfBytes = await fs.promises.readFile(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pageCount = pdfDoc.getPageCount();

        // Use pdf-poppler or pdftoppm for conversion (requires poppler-utils installed)
        // For now, we'll create a simple implementation
        // Note: For production, you'd want to use pdf-poppler or similar library

        const outputFileName = `pdf-to-images-${Date.now()}.zip`;
        const outputPath = path.join(path.dirname(inputPath), outputFileName);

        // Create zip archive
        const output = fs.createWriteStream(outputPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        archive.pipe(output);

        // For demonstration, we'll add a note file
        // In production, you'd convert each page to an image
        archive.append(`PDF has ${pageCount} pages. Image conversion requires additional setup.`, {
            name: 'README.txt'
        });

        await archive.finalize();

        await new Promise((resolve, reject) => {
            output.on('close', resolve);
            output.on('error', reject);
        });

        const outputSize = fs.statSync(outputPath).size;
        const processingTime = Date.now() - startTime;

        await saveFileHistory(
            req.user._id,
            'pdf-to-image',
            req.file.originalname,
            req.file.size,
            outputFileName,
            outputSize,
            'success',
            null,
            processingTime
        );

        res.download(outputPath, outputFileName, (err) => {
            if (err) console.error('Download error:', err);
            setTimeout(() => {
                deleteFile(inputPath);
                deleteFile(outputPath);
                if (fs.existsSync(outputDir)) {
                    fs.rmSync(outputDir, { recursive: true, force: true });
                }
            }, 1000);
        });

    } catch (error) {
        console.error('PDF to Image error:', error);

        await saveFileHistory(
            req.user._id,
            'pdf-to-image',
            req.file?.originalname || 'unknown',
            req.file?.size || 0,
            null,
            null,
            'failed',
            error.message,
            Date.now() - startTime
        );

        if (inputPath) deleteFile(inputPath);
        if (outputDir && fs.existsSync(outputDir)) {
            fs.rmSync(outputDir, { recursive: true, force: true });
        }

        res.status(500).json({
            success: false,
            message: 'Error converting PDF to images',
            error: error.message
        });
    }
};

// @desc    Rotate PDF Pages
// @route   POST /api/pdf/rotate
// @access  Private
export const rotatePDF = async (req, res) => {
    const startTime = Date.now();
    let inputPath = null;
    let outputPath = null;

    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        inputPath = req.file.path;
        const { angle = 90, pages = 'all' } = req.body; // angle: 90, 180, 270; pages: 'all' or '1,2,3'

        const pdfBytes = await fs.promises.readFile(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const totalPages = pdfDoc.getPageCount();

        let pagesToRotate = [];
        if (pages === 'all') {
            pagesToRotate = Array.from({ length: totalPages }, (_, i) => i);
        } else {
            pagesToRotate = pages.split(',').map(p => parseInt(p.trim()) - 1).filter(p => p >= 0 && p < totalPages);
        }

        pagesToRotate.forEach(pageIndex => {
            const page = pdfDoc.getPage(pageIndex);
            const currentRotation = page.getRotation().angle;
            page.setRotation({ type: 'degrees', angle: (currentRotation + parseInt(angle)) % 360 });
        });

        const rotatedPdfBytes = await pdfDoc.save();
        const outputFileName = `rotated-${Date.now()}.pdf`;
        outputPath = path.join(path.dirname(inputPath), outputFileName);

        await fs.promises.writeFile(outputPath, rotatedPdfBytes);

        const outputSize = fs.statSync(outputPath).size;
        const processingTime = Date.now() - startTime;

        await saveFileHistory(
            req.user._id,
            'rotate',
            req.file.originalname,
            req.file.size,
            outputFileName,
            outputSize,
            'success',
            null,
            processingTime
        );

        res.download(outputPath, outputFileName, (err) => {
            if (err) console.error('Download error:', err);
            setTimeout(() => {
                deleteFiles([inputPath, outputPath]);
            }, 1000);
        });

    } catch (error) {
        console.error('Rotate PDF error:', error);

        await saveFileHistory(
            req.user._id,
            'rotate',
            req.file?.originalname || 'unknown',
            req.file?.size || 0,
            null,
            null,
            'failed',
            error.message,
            Date.now() - startTime
        );

        deleteFiles([inputPath, outputPath].filter(Boolean));

        res.status(500).json({
            success: false,
            message: 'Error rotating PDF',
            error: error.message
        });
    }
};

// @desc    Extract Pages from PDF
// @route   POST /api/pdf/extract
// @access  Private
export const extractPages = async (req, res) => {
    const startTime = Date.now();
    let inputPath = null;
    let outputPath = null;

    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        inputPath = req.file.path;
        const { pages } = req.body; // e.g., "1,3,5-7"

        if (!pages) {
            return res.status(400).json({ success: false, message: 'Pages parameter required (e.g., "1,3,5-7")' });
        }

        const pdfBytes = await fs.promises.readFile(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const totalPages = pdfDoc.getPageCount();

        // Parse page ranges
        const pageIndices = new Set();
        pages.split(',').forEach(part => {
            part = part.trim();
            if (part.includes('-')) {
                const [start, end] = part.split('-').map(n => parseInt(n.trim()));
                for (let i = start; i <= end; i++) {
                    if (i > 0 && i <= totalPages) pageIndices.add(i - 1);
                }
            } else {
                const pageNum = parseInt(part);
                if (pageNum > 0 && pageNum <= totalPages) pageIndices.add(pageNum - 1);
            }
        });

        if (pageIndices.size === 0) {
            return res.status(400).json({ success: false, message: 'No valid pages specified' });
        }

        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(pdfDoc, Array.from(pageIndices));
        copiedPages.forEach(page => newPdf.addPage(page));

        const extractedPdfBytes = await newPdf.save();
        const outputFileName = `extracted-${Date.now()}.pdf`;
        outputPath = path.join(path.dirname(inputPath), outputFileName);

        await fs.promises.writeFile(outputPath, extractedPdfBytes);

        const outputSize = fs.statSync(outputPath).size;
        const processingTime = Date.now() - startTime;

        await saveFileHistory(
            req.user._id,
            'extract',
            req.file.originalname,
            req.file.size,
            outputFileName,
            outputSize,
            'success',
            null,
            processingTime
        );

        res.download(outputPath, outputFileName, (err) => {
            if (err) console.error('Download error:', err);
            setTimeout(() => {
                deleteFiles([inputPath, outputPath]);
            }, 1000);
        });

    } catch (error) {
        console.error('Extract pages error:', error);

        await saveFileHistory(
            req.user._id,
            'extract',
            req.file?.originalname || 'unknown',
            req.file?.size || 0,
            null,
            null,
            'failed',
            error.message,
            Date.now() - startTime
        );

        deleteFiles([inputPath, outputPath].filter(Boolean));

        res.status(500).json({
            success: false,
            message: 'Error extracting pages',
            error: error.message
        });
    }
};

// @desc    Split PDF
// @route   POST /api/pdf/split
// @access  Private
export const splitPDF = async (req, res) => {
    const startTime = Date.now();
    let inputPath = null;
    let outputDir = null;

    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        inputPath = req.file.path;
        const { mode = 'pages', value = '1' } = req.body; // mode: 'pages' (pages per file) or 'ranges'

        const pdfBytes = await fs.promises.readFile(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const totalPages = pdfDoc.getPageCount();

        outputDir = path.join(path.dirname(inputPath), `split-${Date.now()}`);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        if (mode === 'pages') {
            const pagesPerFile = parseInt(value) || 1;
            let fileCount = 0;

            for (let i = 0; i < totalPages; i += pagesPerFile) {
                const newPdf = await PDFDocument.create();
                const endPage = Math.min(i + pagesPerFile, totalPages);
                const pageIndices = Array.from({ length: endPage - i }, (_, idx) => i + idx);

                const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
                copiedPages.forEach(page => newPdf.addPage(page));

                const splitPdfBytes = await newPdf.save();
                const splitFileName = `split-${++fileCount}.pdf`;
                await fs.promises.writeFile(path.join(outputDir, splitFileName), splitPdfBytes);
            }
        }

        // Create zip of split files
        const outputFileName = `split-pdf-${Date.now()}.zip`;
        const outputPath = path.join(path.dirname(inputPath), outputFileName);
        const output = fs.createWriteStream(outputPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        archive.pipe(output);
        archive.directory(outputDir, false);
        await archive.finalize();

        await new Promise((resolve, reject) => {
            output.on('close', resolve);
            output.on('error', reject);
        });

        const outputSize = fs.statSync(outputPath).size;
        const processingTime = Date.now() - startTime;

        await saveFileHistory(
            req.user._id,
            'split',
            req.file.originalname,
            req.file.size,
            outputFileName,
            outputSize,
            'success',
            null,
            processingTime
        );

        res.download(outputPath, outputFileName, (err) => {
            if (err) console.error('Download error:', err);
            setTimeout(() => {
                deleteFile(inputPath);
                deleteFile(outputPath);
                if (fs.existsSync(outputDir)) {
                    fs.rmSync(outputDir, { recursive: true, force: true });
                }
            }, 1000);
        });

    } catch (error) {
        console.error('Split PDF error:', error);

        await saveFileHistory(
            req.user._id,
            'split',
            req.file?.originalname || 'unknown',
            req.file?.size || 0,
            null,
            null,
            'failed',
            error.message,
            Date.now() - startTime
        );

        if (inputPath) deleteFile(inputPath);
        if (outputDir && fs.existsSync(outputDir)) {
            fs.rmSync(outputDir, { recursive: true, force: true });
        }

        res.status(500).json({
            success: false,
            message: 'Error splitting PDF',
            error: error.message
        });
    }
};

// Placeholder implementations for remaining features
export const addWatermark = async (req, res) => {
    res.status(501).json({ success: false, message: 'Watermark feature coming soon' });
};

export const removePages = async (req, res) => {
    res.status(501).json({ success: false, message: 'Remove pages feature coming soon' });
};

export const pdfToWord = async (req, res) => {
    res.status(501).json({ success: false, message: 'PDF to Word feature coming soon' });
};

export const wordToPDF = async (req, res) => {
    res.status(501).json({ success: false, message: 'Word to PDF feature coming soon' });
};

export const protectPDF = async (req, res) => {
    res.status(501).json({ success: false, message: 'Protect PDF feature coming soon' });
};

export const unlockPDF = async (req, res) => {
    res.status(501).json({ success: false, message: 'Unlock PDF feature coming soon' });
};

export const addPageNumbers = async (req, res) => {
    res.status(501).json({ success: false, message: 'Add page numbers feature coming soon' });
};

export const reorderPages = async (req, res) => {
    res.status(501).json({ success: false, message: 'Reorder pages feature coming soon' });
};
