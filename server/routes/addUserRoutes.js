const express = require('express');
const router = express.Router();
const { addUser } = require('../controllers/addUser');
const { loginUser } = require('../controllers/loginUser');

router.post('/add-new-user', addUser);
router.post('/login-user', loginUser);

module.exports = router;