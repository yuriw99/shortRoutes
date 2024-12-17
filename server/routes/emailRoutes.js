const express = require('express');
const router = express.Router();
const { sendVerificationCode } = require('../controllers/userVerification');

router.post('/send-verification-email', sendVerificationCode);

module.exports = router;