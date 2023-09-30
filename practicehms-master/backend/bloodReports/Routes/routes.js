// routes/bloodreportsRoutes.js
const express = require('express');
const router = express.Router();
const bloodreportsController = require('../Controller/controller'); // Import the bloodreports controller

router.post('/addBloodReport', bloodreportsController.addBloodReport);
router.get('/readBloodReports', bloodreportsController.readBloodReports);
router.put('/updateBloodReport/:id', bloodreportsController.updateBloodReport);
router.delete('/deleteBloodReport/:id', bloodreportsController.deleteBloodReport);
router.get('/getBloodReport/:id', bloodreportsController.getBloodReport);

module.exports = router;
