const express = require('express');
const router = express.Router();

const { getAllFeedbacks } = require('../controllers/feedback-controller');

const authMiddleware = require('../middleware/auth-middleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// ✅ Only accessible to authenticated admins
router.get('/admin/feedbacks', authMiddleware, roleMiddleware('admin'), getAllFeedbacks);

module.exports = router;
