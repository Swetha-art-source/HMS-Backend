// routes/doctorsRoutes.js
const express = require('express');
const router = express.Router();
const doctorsController = require('../Controller/controller'); // Import the doctors controller
const upload = doctorsController.upload;

router.post('/addDoctor', upload.single("file_path"), doctorsController.addDoctor);
router.get('/readDoctors', doctorsController.readDoctors);
router.put('/updateDoctor/:id', doctorsController.updateDoctor);
router.delete('/deleteDoctor/:id', doctorsController.deleteDoctor);
router.get('/getDoctor/:id', doctorsController.getDoctor);

module.exports = router;
