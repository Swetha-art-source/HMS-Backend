// controllers/customerController.js
const Customer = require('../Model/model');

const createCustomer = async (req, res) => {
    const { name, age, gender, mail, inquiry, message } = req.body;

    const newCustomer = new Customer({
        name,
        age,
        gender,
        mail,
        inquiry,
        message
    });

    try {
        await newCustomer.save();
        res.status(200).json("Customer Added");
    } catch (err) {
        console.error(err);
        res.status(500).json("Error adding customer");
    }
};

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (err) {
        console.error(err);
        res.status(500).json("Error reading customers");
    }
};

const getOneCustomer = async (req, res) => {
    const userId = req.params.id;

    try {
        const customer = await Customer.findById(userId);
        res.status(200).json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with get user", error: err.message });
    }
};

const updateCustomer = async (req, res) => {
    const userId = req.params.id;
    const { name, age, gender, mail, inquiry, message } = req.body;

    const updateCustomer = {
        name,
        age,
        gender,
        mail,
        inquiry,
        message
    };

    try {
        await Customer.findByIdAndUpdate(userId, updateCustomer);
        res.status(200).json({ status: "User update" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error with updating date" });
    }
};

const deleteCustomer = async (req, res) => {
    const userId = req.params.id;

    try {
        await Customer.findByIdAndDelete(userId);
        res.status(200).json({ status: "User deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with delete user", error: err.message });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getOneCustomer,
    updateCustomer,
    deleteCustomer,
};
