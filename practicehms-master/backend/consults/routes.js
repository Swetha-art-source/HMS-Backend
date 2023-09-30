// routes/consultRoutes.js
const express = require('express');
const router = express.Router();
const consultController = require('./controller'); // Import the consult controller

router.post('/vidappointment', consultController.createVideoConsultation);
router.get('/', consultController.getAllVideoConsultations);
router.put('/update/:id', consultController.updateVideoConsultation);
router.delete('/delete/:id', consultController.deleteVideoConsultation);
router.get('/get/:id', consultController.getOneVideoConsultation);

module.exports = router;
