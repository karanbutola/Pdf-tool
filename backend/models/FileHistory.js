import mongoose from 'mongoose';

const fileHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    operation: {
        type: String,
        required: true,
        enum: [
            'compress',
            'merge',
            'split',
            'image-to-pdf',
            'pdf-to-image',
            'rotate',
            'extract',
            'watermark',
            'remove-pages',
            'pdf-to-word',
            'word-to-pdf',
            'protect',
            'unlock',
            'add-page-numbers',
            'reorder-pages'
        ]
    },
    fileName: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    outputFileName: {
        type: String
    },
    outputFileSize: {
        type: Number
    },
    status: {
        type: String,
        enum: ['success', 'failed'],
        default: 'success'
    },
    errorMessage: {
        type: String
    },
    processingTime: {
        type: Number // in milliseconds
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
fileHistorySchema.index({ user: 1, createdAt: -1 });
fileHistorySchema.index({ operation: 1 });

const FileHistory = mongoose.model('FileHistory', fileHistorySchema);

export default FileHistory;
