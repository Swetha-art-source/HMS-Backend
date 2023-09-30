// reportController.js

const Report = require("../Model/model");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
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

const addReport = async (req, res) => {
    const ID = req.body.ID;
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const doctor = req.body.doctor;
    const sampleType = req.body.sampleType;
    const processedDate = req.body.processedDate;
    const TechnologistName = req.body.TechnologistName;
    const filepath = req.file.filename;
    const status = "noted";

    const newReport = new Report({
        ID,
        name,
        age,
        gender,
        doctor,
        sampleType,
        processedDate,
        TechnologistName,
        filepath,
        status
    });

    try {
        await newReport.save();
        res.json("Data successfully Added");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error with adding data" });
    }
};

const getReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error with getting data" });
    }
};

const updateReport = async (req, res) => {
    const userId = req.params.id;
    const { ID, name, age, gender, doctor, sampleType, processedDate, TechnologistName, filepath, status } = req.body;

    const updateReport = {
        ID,
        name,
        age,
        gender,
        doctor,
        sampleType,
        processedDate,
        TechnologistName,
        filepath,
        status
    };

    try {
        await Report.findByIdAndUpdate(userId, updateReport);
        res.status(200).json({ status: "User updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error with updating data" });
    }
};

const deleteReport = async (req, res) => {
    const userId = req.params.id;
    
    try {
        await Report.findByIdAndDelete(userId);
        res.status(200).json({ status: "User deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error with deleting user", message: err.message });
    }
};

const getReportById = async (req, res) => {
    const userId = req.params.id;

    try {
        const report = await Report.findById(userId);
        if (!report) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(report);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error with getting user", message: err.message });
    }
};

module.exports = {
    addReport,
    getReports,
    updateReport,
    deleteReport,
    getReportById,
    upload,
};
