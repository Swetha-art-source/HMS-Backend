// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../Controller/controller'); // Import the customer controller

router.post('/add', customerController.createCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/get/:id', customerController.getOneCustomer);
router.put('/update/:id', customerController.updateCustomer);
router.delete('/delete/:id', customerController.deleteCustomer);

module.exports = router;
