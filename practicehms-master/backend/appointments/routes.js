// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('./controller'); // Import the appointment controller
const upload = appointmentController.upload;


// Define routes using controller functions
router.post('/addAppointment', upload.single("file_path"), appointmentController.createAppointment);
router.get('/readAppointments', appointmentController.readAppointments);
router.put('/updateAppointment/:id', appointmentController.updateAppointment);
router.delete('/deleteAppointment/:id', appointmentController.deleteAppointment);
router.get('/getOneAppointment/:id', appointmentController.getOneAppointment);
router.get('/getOneByNIC/:nic', appointmentController.getOneAppointmentByNIC);

module.exports = router;
