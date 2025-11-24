import express from 'express';
import { uploadSingle, uploadMultiple } from '../middleware/upload.js';
import {
    mergePDFs,
    imageToPDF,
    pdfToImage,
    rotatePDF,
    extractPages,
    splitPDF
} from '../controllers/pdfController.js';

const router = express.Router();

// PDF Operations Routes - No authentication required
router.post('/merge', uploadMultiple, mergePDFs);
router.post('/image-to-pdf', uploadMultiple, imageToPDF);
router.post('/pdf-to-image', uploadSingle, pdfToImage);
router.post('/rotate', uploadSingle, rotatePDF);
router.post('/extract', uploadSingle, extractPages);
router.post('/split', uploadSingle, splitPDF);

export default router;
