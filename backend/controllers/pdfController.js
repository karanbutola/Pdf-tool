import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Compression feature removed

// Helper to delete files
const deleteFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (error) {
        console.error('Error deleting file:', error);
    }
};

const deleteFiles = (filePaths) => {
    filePaths.forEach(deleteFile);
};

// Compression feature removed - handler deleted

// @desc    Merge PDFs
// @route   POST /api/pdf/merge
export const mergePDFs = async (req, res) => {
    const filePaths = [];
    let outputPath = null;

    try {
        if (!req.files || req.files.length < 2) {
            return res.status(400).json({ success: false, message: 'At least 2 PDF files required' });
        }

        req.files.forEach(file => filePaths.push(file.path));

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

        res.download(outputPath, outputFileName, (err) => {
            if (err) console.error('Download error:', err);
            setTimeout(() => {
                deleteFiles([...filePaths, outputPath]);
            }, 1000);
        });

    } catch (error) {
        console.error('Merge PDFs error:', error);
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
export const imageToPDF = async (req, res) => {
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

        res.download(outputPath, outputFileName, (err) => {
            if (err) console.error('Download error:', err);
            setTimeout(() => {
                deleteFiles([...filePaths, outputPath]);
            }, 1000);
        });

    } catch (error) {
        console.error('Image to PDF error:', error);
        deleteFiles([...filePaths, outputPath].filter(Boolean));
        res.status(500).json({
            success: false,
            message: 'Error converting images to PDF',
            error: error.message
        });
    }
};

// @desc    Convert PDF to Images (placeholder)
// @route   POST /api/pdf/pdf-to-image
export const pdfToImage = async (req, res) => {
    let inputPath = null;

    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        inputPath = req.file.path;
        const pdfBytes = await fs.promises.readFile(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pageCount = pdfDoc.getPageCount();

        const outputFileName = `pdf-info-${Date.now()}.txt`;
        const outputPath = path.join(path.dirname(inputPath), outputFileName);

        await fs.promises.writeFile(
            outputPath,
            `PDF has ${pageCount} pages.\nNote: Image conversion requires additional setup.`
        );

        res.download(outputPath, outputFileName, (err) => {
            if (err) console.error('Download error:', err);
            setTimeout(() => {
                deleteFile(inputPath);
                deleteFile(outputPath);
            }, 1000);
        });

    } catch (error) {
        console.error('PDF to Image error:', error);
        if (inputPath) deleteFile(inputPath);
        res.status(500).json({
            success: false,
            message: 'Error converting PDF to images',
            error: error.message
        });
    }
};

// @desc    Rotate PDF Pages
// @route   POST /api/pdf/rotate
export const rotatePDF = async (req, res) => {
    let inputPath = null;
    let outputPath = null;

    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        inputPath = req.file.path;
        const { angle = 90, pages = 'all' } = req.body;

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

        res.download(outputPath, outputFileName, (err) => {
            if (err) console.error('Download error:', err);
            setTimeout(() => {
                deleteFiles([inputPath, outputPath]);
            }, 1000);
        });

    } catch (error) {
        console.error('Rotate PDF error:', error);
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
export const extractPages = async (req, res) => {
    let inputPath = null;
    let outputPath = null;

    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        inputPath = req.file.path;
        const { pages } = req.body;

        if (!pages) {
            return res.status(400).json({ success: false, message: 'Pages parameter required (e.g., "1,3,5-7")' });
        }

        const pdfBytes = await fs.promises.readFile(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const totalPages = pdfDoc.getPageCount();

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

        res.download(outputPath, outputFileName, (err) => {
            if (err) console.error('Download error:', err);
            setTimeout(() => {
                deleteFiles([inputPath, outputPath]);
            }, 1000);
        });

    } catch (error) {
        console.error('Extract pages error:', error);
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
export const splitPDF = async (req, res) => {
    let inputPath = null;
    let outputDir = null;

    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        inputPath = req.file.path;
        const { mode = 'pages', value = '1' } = req.body;

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
