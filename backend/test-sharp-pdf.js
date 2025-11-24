import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try to create a dummy PDF input (or just check metadata of a non-existent file to see if format is supported)
// Better: check sharp.format
console.log('Sharp formats:', sharp.format);
try {
    const formats = sharp.format;
    if (formats.pdf && formats.pdf.input) {
        console.log('PDF input is supported!');
    } else {
        console.log('PDF input is NOT supported.');
    }
} catch (e) {
    console.error(e);
}
