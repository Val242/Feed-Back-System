const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();


router.get(
    '/dashboard',
    authMiddleware,
    roleMiddleware('admin'),
    (req, res) => {
    res.json({ message: 'Welcome, Admin' });
  }
)

module.exports = router;