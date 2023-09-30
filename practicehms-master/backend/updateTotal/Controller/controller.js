const updateTot = require("../Model/model");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Prescriptions');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({ storage: storage });

const addUpdateTotal = async (req, res) => {
    const orderID = req.body.orderID;
    const totalFee = Number(req.body.totalFee);

    const newFee = new updateTot({
        orderID,
        totalFee
    });

    try {
        console.log("Data before saving:", newFee);
        await newFee.save();
        console.log("Data after saving:", newFee);
        res.json("Data Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error with adding data", message: err.message });
    }
};

const getAllUpdateTotals = async (req, res) => {
    try {
        const fee = await updateTot.find();
        res.json(fee);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error with fetching data", message: err.message });
    }
};

const updateUpdateTotal = async (req, res) => {
    let oID = req.params.id;
    const { orderID, totalFee } = req.body;

    const updateTotal = {
        orderID,
        totalFee
    };

    try {
        await updateTot.findByIdAndUpdate(oID, updateTotal);
        res.status(200).json({ status: "Data updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
};

const deleteUpdateTotal = async (req, res) => {
    let oID = req.params.id;

    try {
        await updateTot.findByIdAndDelete(oID);
        res.status(200).json({ status: "Data Deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with deleting data", error: err.message });
    }
};

module.exports = {
    addUpdateTotal,
    getAllUpdateTotals,
    updateUpdateTotal,
    deleteUpdateTotal,
    upload,
};
