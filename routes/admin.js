const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();


router.get(
    '/dashboard',
    authMiddleware,
    roleMiddleware('admin'),
 async (req, res) => {
    try {
      // You can perform any async operations here if needed
      res.status(200).json({ message: 'Welcome, Admin' });
    } catch (error) {
      console.error('Error in /dashboard route:', error);
      res.status(500).json({ error: 'Server Error. Please try again later.' });
    }
  }
)

module.exports = router;