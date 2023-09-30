// controllers/doctorsController.js
const Doctor = require('../Model/model');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './DoctorImage');
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
}

let upload = multer({ storage: storage });

const addDoctor = async (req, res) => {
    const {
        firstname,
        lastname,
        age,
        address,
        email,
        mobile,
        gender,
        maritalstatus,
        specialization,
        experianceduration,
        previousehospitals,
        awards,
        workingdays,
    } = req.body;

    // Multer should have already stored the file in the DoctorImage directory,
    // so you can construct the file_path based on the generated filename
    const file_path = req.file.filename;

    const newDoctor = new Doctor({
        firstname,
        lastname,
        age,
        address,
        email,
        mobile,
        gender,
        maritalstatus,
        specialization,
        experianceduration,
        previousehospitals,
        awards,
        workingdays,
        file_path
    });
    
    try {
        await newDoctor.save();
        res.json('Doctor Added');
    } catch (err) {
        console.log(err);
    }
};

const readDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        
        res.json(doctors);
    } catch (err) {
        console.log(err);
    }
};

const updateDoctor = async (req, res) => {
    const userId = req.params.id;
    const {
        firstname,
        lastname,
        age,
        address,
        email,
        mobile,
        gender,
        maritalstatus,
        specialization,
        experianceduration,
        previousehospitals,
        awards,
        workingdays,
        file_path,
    } = req.body;

    const updateDoctor = {
        firstname,
        lastname,
        age,
        address,
        email,
        mobile,
        gender,
        maritalstatus,
        specialization,
        experianceduration,
        previousehospitals,
        awards,
        workingdays,
    };

    try {
        await Doctor.findByIdAndUpdate(userId, updateDoctor);
        res.status(200).send({ status: 'Doctor updated' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with updating data', error: err.message });
    }
};

const deleteDoctor = async (req, res) => {
    const userId = req.params.id;

    try {
        await Doctor.findByIdAndDelete(userId);
        res.status(200).send({ status: 'Doctor deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: 'Error with deleting doctor', error: err.message });
    }
};

const getDoctor = async (req, res) => {
    const userId = req.params.id;

    try {
        const doctor = await Doctor.findById(userId);
        res.json(doctor);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: 'Error with getting doctor', error: err.message });
    }
};

module.exports = {
    addDoctor,
    readDoctors,
    updateDoctor,
    deleteDoctor,
    getDoctor,
    upload,
};
