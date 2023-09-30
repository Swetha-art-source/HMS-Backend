const patient = require("../Model/model");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const nodemailer = require('nodemailer');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './ProfilePic');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'medixoehealth',
        pass: 'boupdtqanzqxslcg'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const addPatient = async (req, res) => {
    const name = req.body.name;
    const nic = req.body.nic;
    const address = req.body.address;
    const birthdate = req.body.birthdate;
    const gender = req.body.gender;
    const phone = Number(req.body.phone);
    const email = req.body.email;
    const blood = req.body.blood;
    const height = Number(req.body.height);
    const weight = Number(req.body.weight);
    const surgery = req.body.surgery;
    const allergy = req.body.allergy;
    let profilePic = req.file.filename;
    const password = req.body.password;

    if (req.file) {
        image = req.file.filename;
    }

    const newPatient = new patient({
        name,
        nic,
        address,
        birthdate,
        gender,
        phone,
        email,
        blood,
        height,
        weight,
        surgery,
        allergy,
        profilePic,
        password
    });

    const mailOptions = {
        from: 'medixoehealth@gmail.com',
        to: email,
        subject: 'Registration Success',
        text: `Dear ${name}, \n\n You have registered to Medixo E-Health system successfully!!`
    };

    try {
        await newPatient.save();
        res.json("Patient added successfully!");

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("email sent : " + info.response);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error with adding a patient!", message: err.message });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const patients = await patient.find();
        res.json(patients);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error with fetching patients!", message: err.message });
    }
};

const updatePatient = async (req, res) => {
    let userId = req.params.id;
    const { name, nic, address, birthdate, gender, phone, email, blood, height, weight, surgery, allergy } = req.body;

    const updatePatient = {
        name,
        nic,
        address,
        birthdate,
        gender,
        phone,
        email,
        blood,
        height,
        weight,
        surgery,
        allergy
    };

    try {
        await patient.findByIdAndUpdate(userId, updatePatient);
        res.status(200).json({ status: "Patient details updated successfully!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error with updating data!", message: err.message });
    }
};

const deletePatient = async (req, res) => {
    let userId = req.params.id;

    try {
        await patient.findByIdAndDelete(userId);
        res.status(200).json({ status: "Patient deleted successfully!" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Error with deleting patient!", message: err.message });
    }
};

const getPatientById = async (req, res) => {
    let userId = req.params.id;

    try {
        const user = await patient.findById(userId);
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Error with fetching patient!", message: err.message });
    }
};

module.exports = {
    addPatient,
    getAllPatients,
    updatePatient,
    deletePatient,
    getPatientById,
    upload,
};
