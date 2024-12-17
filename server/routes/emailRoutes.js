const express = require('express');
const router = express.Router();
const { sendVerificationCode } = require('../controllers/sendEmailController');

router.post('/send-verification-email', sendVerificationCode);

module.exports = router;