const express = require('express');
const {adminLogin,registerAdmin,registerFeedBack} = require('../controllers/auth-controller')
const router = express.Router();


router.post('/registeradmin', registerAdmin);
router.post('/registerfeedback', registerFeedBack);
router.post('/adminlogin', adminLogin);
module.exports = router;
