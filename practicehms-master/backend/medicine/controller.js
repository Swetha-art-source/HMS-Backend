// medicineController.js
const Medicine = require("./model");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Prescriptions');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({ storage: storage })


const addMedicine = async (req, res) => {
    const mName = req.body.mName;
    const uPrice = req.body.uPrice;
    const qty = req.body.qty;

    const newMedicine = new Medicine({
        mName,
        uPrice,
        qty
    });

    try {
        console.log("Received data from client:", req.body); // Log the data received from the client
        await newMedicine.save();
        console.log("Data saved successfully");
        res.json("Data Added");
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Error with adding data" });
    }
};

const getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json(medicines);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error with getting data" });
    }
};

const updateMedicine = async (req, res) => {
    const userId = req.params.id;
    const { mName, uPrice, qty } = req.body;

    const updateMedicine = {
        mName,
        uPrice,
        qty
    };

    try {
        await Medicine.findByIdAndUpdate(userId, updateMedicine);
        res.status(200).json({ status: "Medicine updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
};

const getMedicineById = async (req, res) => {
    const userId = req.params.id;

    try {
        const medicine = await Medicine.findById(userId);
        if (!medicine) {
            return res.status(404).json({ error: "Medicine not found" });
        }
        res.json(medicine);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error with getting medicine", error: err.message });
    }
};

const deleteMedicine = async (req, res) => {
    const uID = req.params.id;

    try {
        await Medicine.findByIdAndDelete(uID);
        res.status(200).json({ status: "Medicine Deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with delete medicine", error: err.message });
    }
};

module.exports = {
    addMedicine,
    getMedicines,
    updateMedicine,
    getMedicineById,
    deleteMedicine,
    upload,
};
