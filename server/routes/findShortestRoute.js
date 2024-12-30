const express = require('express');
const router = express.Router();
const { findShortestRoute } = require('../controllers/timeMatrix');

router.post('/find-shortest-route', findShortestRoute );

module.exports = router;