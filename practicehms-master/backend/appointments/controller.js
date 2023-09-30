// controllers/appointmentController.js
const Appointment = require('./model');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Appoinment_slip');
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

//Create a transporter object
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'medixoehealth',
        pass: 'boupdtqanzqxslcg'
    }
});

const createAppointment = async (req, res) => {
    const {
        specialization,
        doctor_name,
        first_name,
        last_name,
        age,
        nic,
        email,
        telephone,
        status,
        date,
        appNo,
        appTime
    } = req.body;

    const newAppointment = new Appointment({
        specialization,
        doctor_name,
        first_name,
        last_name,
        age,
        nic,
        email,
        telephone,
        status,
        date,
        appNo,
        appTime
    });

    const mailOptions = {
        from: 'medixoehealth@gmail.com',
        to: email,
        subject: 'Appointment details',
        text: `Dear ${first_name},\n\nYour appointment Number is ${appNo}. it has been scheduled for ${date} at ${appTime}.\n\nThank you for choosing our hospital. (This is a system-generated email)`
    };

    try {
        await newAppointment.save();

        // Send mail
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json("Appointment added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json("Error adding appointment");
    }
};

const readAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        console.error(err);
        res.status(500).json("Error reading appointments");
    }
};

const updateAppointment = async (req, res) => {
    const userId = req.params.id;
    const {
        specialization,
        doctor_name,
        first_name,
        last_name,
        age,
        nic,
        email,
        telephone,
        status,
        date,
        appNo,
        appTime
    } = req.body;

    const updatedAppointment = {
        specialization,
        doctor_name,
        first_name,
        last_name,
        age,
        nic,
        email,
        telephone,
        status,
        date,
        appNo,
        appTime
    };

    try {
        await Appointment.findByIdAndUpdate(userId, updatedAppointment);
        res.status(200).json({ status: "Appointment Status Updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Not updated", error: err.message });
    }
};

const deleteAppointment = async (req, res) => {
    const userId = req.params.id;

    try {
        await Appointment.findByIdAndDelete(userId);
        res.status(200).json({ status: "Appointment deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Delete unsuccessful, please try again", error: err.message });
    }
};

const getOneAppointment = async (req, res) => {
    const userId = req.params.id;

    try {
        const appointment = await Appointment.findById(userId);
        res.status(200).json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error", error: err.message });
    }
};

const getOneAppointmentByNIC = async (req, res) => {
    const userNic = req.params.nic;

    try {
        const appointment = await Appointment.findOne({ nic: userNic });
        res.status(200).json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error", error: err.message });
    }
};

module.exports = {
    createAppointment,
    readAppointments,
    updateAppointment,
    deleteAppointment,
    getOneAppointment,
    getOneAppointmentByNIC,
    upload,
};