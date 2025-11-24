import express from 'express';
import { uploadSingle, uploadMultiple } from '../middleware/upload.js';
import {
    compressPDF,
    mergePDFs,
    imageToPDF,
    pdfToImage,
    rotatePDF,
    extractPages,
    splitPDF,
    addWatermark,
    removePages,
    pdfToWord,
    wordToPDF,
    protectPDF,
    unlockPDF,
    addPageNumbers,
    reorderPages
} from '../controllers/pdfController.js';

const router = express.Router();

// PDF Operations Routes - No authentication required
router.post('/compress', uploadSingle, compressPDF);
router.post('/merge', uploadMultiple, mergePDFs);
router.post('/image-to-pdf', uploadMultiple, imageToPDF);
router.post('/pdf-to-image', uploadSingle, pdfToImage);
router.post('/rotate', uploadSingle, rotatePDF);
router.post('/extract', uploadSingle, extractPages);
router.post('/split', uploadSingle, splitPDF);
router.post('/watermark', uploadSingle, addWatermark);
router.post('/remove-pages', uploadSingle, removePages);
router.post('/pdf-to-word', uploadSingle, pdfToWord);
router.post('/word-to-pdf', uploadSingle, wordToPDF);
router.post('/protect', uploadSingle, protectPDF);
router.post('/unlock', uploadSingle, unlockPDF);
router.post('/add-page-numbers', uploadSingle, addPageNumbers);
router.post('/reorder', uploadSingle, reorderPages);

export default router;
