const express = require('express');
const router = express.Router();
const controller = require('../controllers')

// create the route for subcription for notification. 
router.post('/subscribe', controller.subscribe);

module.exports = router
