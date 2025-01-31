const express = require('express');
const router = express.Router();
const {saveRoutes} = require('../controllers/saveRoutes')
const {getRoutes} = require('../controllers/getRoutes')

router.get('/get-routes', getRoutes)
router.post('/save-routes', saveRoutes)

module.exports = router