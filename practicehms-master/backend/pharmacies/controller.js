// pharmacyController.js

const Pharmacy = require("./model");
const { v4: uuidv4 } = require('uuid');
const path = require("path");

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Prescriptions');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage, fileFilter });

const addPharmacy = async (req, res) => {
    const orderID = "DefaultOrder";
    const title = req.body.title;
    const name = req.body.name;
    const age = Number(req.body.age);
    const email = req.body.email;
    const telephone = req.body.telephone;
    const town = req.body.town;
    const address = req.body.address;
    const prescription = req.file.filename;
    const status = "Pending";

    const newPharmacy = new Pharmacy({
        orderID,
        title,
        name,
        age,
        email,
        telephone,
        town,
        address,
        prescription,
        status
    });

    try {
        await newPharmacy.save();
        res.json("Data Added");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error with adding data" });
    }
};

const getPharmacies = async (req, res) => {
    try {
        const pharmacies = await Pharmacy.find();
        res.json(pharmacies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error with getting data" });
    }
};

const updatePharmacy = async (req, res) => {
    const uID = req.params.id;
    const { orderID, title, name, age, email, telephone, town, address, prescription, status } = req.body;

    const updatePharmacy = {
        orderID,
        title,
        name,
        age,
        email,
        telephone,
        town,
        address,
        prescription,
        status
    };

    try {
        await Pharmacy.findByIdAndUpdate(uID, updatePharmacy);
        res.status(200).json({ status: "Pharmacy updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
};

const getPharmacyById = async (req, res) => {
    const userId = req.params.id;

    try {
        const pharmacy = await Pharmacy.findById(userId);
        if (!pharmacy) {
            return res.status(404).json({ error: "Pharmacy not found" });
        }
        res.json(pharmacy);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error with getting pharmacy", error: err.message });
    }
};

const deletePharmacy = async (req, res) => {
    const uID = req.params.id;

    try {
        await Pharmacy.findByIdAndDelete(uID);
        res.status(200).json({ status: "Pharmacy Deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with delete pharmacy", error: err.message });
    }
};

module.exports = {
    addPharmacy,
    getPharmacies,
    updatePharmacy,
    getPharmacyById,
    deletePharmacy,
    upload,
};
