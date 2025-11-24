import cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, '../uploads');

// Delete files older than specified time (default 1 hour)
export const cleanupOldFiles = () => {
    const maxAge = parseInt(process.env.TEMP_FILE_LIFETIME) || 3600000; // 1 hour in milliseconds
    const now = Date.now();

    try {
        if (!fs.existsSync(uploadsDir)) {
            console.log('Uploads directory does not exist');
            return;
        }

        const files = fs.readdirSync(uploadsDir);
        let deletedCount = 0;

        files.forEach(file => {
            const filePath = path.join(uploadsDir, file);
            const stats = fs.statSync(filePath);

            // Check if file is older than maxAge
            if (now - stats.mtimeMs > maxAge) {
                try {
                    fs.unlinkSync(filePath);
                    deletedCount++;
                    console.log(`🗑️  Deleted old file: ${file}`);
                } catch (error) {
                    console.error(`Error deleting file ${file}:`, error.message);
                }
            }
        });

        if (deletedCount > 0) {
            console.log(`✅ Cleanup complete: ${deletedCount} file(s) deleted`);
        }
    } catch (error) {
        console.error('Error during file cleanup:', error.message);
    }
};

// Delete specific file
export const deleteFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`🗑️  Deleted file: ${path.basename(filePath)}`);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Error deleting file ${filePath}:`, error.message);
        return false;
    }
};

// Delete multiple files
export const deleteFiles = (filePaths) => {
    filePaths.forEach(filePath => deleteFile(filePath));
};

// Start cleanup scheduler (runs every 30 minutes)
export const startCleanupScheduler = () => {
    // Run cleanup every 30 minutes
    cron.schedule('*/30 * * * *', () => {
        console.log('🧹 Running scheduled file cleanup...');
        cleanupOldFiles();
    });

    // Also run cleanup on startup
    console.log('🧹 Running initial file cleanup...');
    cleanupOldFiles();
};
