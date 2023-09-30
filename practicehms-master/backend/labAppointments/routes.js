
// routes/labAppoinmentRoutes.js
const express = require('express');
const router = express.Router();
const labAppoinmentController = require('./controller'); // Import the lab appointment controller
const upload = labAppoinmentController.upload;


// Define routes using controller functions
router.post('/addLabAppoinment', upload.single("file_path"), labAppoinmentController.createLabAppoinment);
router.get('/readlabAppoinment', labAppoinmentController.readLabAppoinment);
router.put('/updatelabAppoinment/:id', labAppoinmentController.updateLabAppoinment);
router.delete('/deletelabAppoinment/:id', labAppoinmentController.deleteLabAppoinment);
router.get('/getonelabAppoinment/:id', labAppoinmentController.getOneLabAppoinment);
router.get('/getone/:nic', labAppoinmentController.getOneLabAppoinmentByNIC);

module.exports = router;
