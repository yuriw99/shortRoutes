const express = require('express');
const router = express.Router();
const { addUser } = require('../controllers/addUser');

router.post('/add-new-user', addUser);

module.exports = router;