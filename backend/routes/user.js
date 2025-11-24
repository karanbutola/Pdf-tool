import express from 'express';
import { protect } from '../middleware/auth.js';
import FileHistory from '../models/FileHistory.js';

const router = express.Router();

// @route   GET /api/user/history
// @desc    Get user's file operation history
// @access  Private
router.get('/history', protect, async (req, res) => {
    try {
        const { page = 1, limit = 20, operation } = req.query;

        const query = { user: req.user._id };
        if (operation) {
            query.operation = operation;
        }

        const history = await FileHistory.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await FileHistory.countDocuments(query);

        res.json({
            success: true,
            data: history,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count
        });
    } catch (error) {
        console.error('Get history error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching history',
            error: error.message
        });
    }
});

// @route   GET /api/user/stats
// @desc    Get user's statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
    try {
        const totalOperations = await FileHistory.countDocuments({ user: req.user._id });

        const operationStats = await FileHistory.aggregate([
            { $match: { user: req.user._id } },
            { $group: { _id: '$operation', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const recentOperations = await FileHistory.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            success: true,
            data: {
                totalOperations,
                operationStats,
                recentOperations
            }
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message
        });
    }
});

export default router;
