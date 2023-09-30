// routes/appointmentAutoRoutes.js
const express = require('express');
const router = express.Router();
const appointmentAutoController = require('./autoController'); // Import the appointmentAuto controller

router.post('/setupCronJob', appointmentAutoController.setupCronJob);

module.exports = router;
