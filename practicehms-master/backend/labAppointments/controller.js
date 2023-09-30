// controllers/labAppoinmentController.js
const labAppoinment = require('./model');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const path = require("path");

// ... Define your multer storage and fileFilter here ...
const multer = require('multer');

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

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'medixoehealth',
        pass: 'boupdtqanzqxslcg'
    }
});

const createLabAppoinment = async (req, res) => {
    // Move the logic for creating a lab appointment here
    const {
        first_name,
        last_name,
        age,
        nic,
        email,
        telephone,
        status,
        date,
        labTest,
        appNo,
        appTime
    } = req.body;
    const file_path = req.file.filename;

    const newlabAppoinment = new labAppoinment({
        first_name,
        last_name,
        age,
        nic,
        email,
        telephone,
        file_path,
        status,
        date,
        labTest,
        appNo,
        appTime
    });

    const mailOptions = {
        from: 'medixoehealth@gmail.com',
        to: email,
        subject: 'Appointment details',
        text: `Dear ${first_name},\n\nYour Lab appointment Number is ${appNo}. it has been scheduled for ${date} at ${appTime}.\n\nThank you for choosing our hospital. (This is a system-generated email)`
    };

    try {
        await newlabAppoinment.save();

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

const readLabAppoinment = async (req, res) => {
    // Move the logic for reading lab appointments here
    try {
        const labAppoinments = await labAppoinment.find();
        res.status(200).json(labAppoinments);
    } catch (err) {
        console.error(err);
        res.status(500).json("Error reading lab appointments");
    }
};

const updateLabAppoinment = async (req, res) => {
    // Move the logic for updating lab appointments here
    const userId = req.params.id;
    const {
        first_name,
        last_name,
        age,
        nic,
        email,
        telephone,
        file_path,
        status,
        date,
        labTest,
        appNo,
        appTime
    } = req.body;

    const updatelabAppoinment = {
        first_name,
        last_name,
        age,
        nic,
        email,
        telephone,
        file_path,
        status,
        date,
        labTest,
        appNo,
        appTime
    };

    try {
        await labAppoinment.findByIdAndUpdate(userId, updatelabAppoinment);
        res.status(200).json({ status: "Appointment Status Updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Not updated", error: err.message });
    }
};

const deleteLabAppoinment = async (req, res) => {
    // Move the logic for deleting lab appointments here
    const userId = req.params.id;

    try {
        await labAppoinment.findByIdAndDelete(userId);
        res.status(200).json({ status: "Appointment deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Delete unsuccessful, please try again", error: err.message });
    }
};

const getOneLabAppoinment = async (req, res) => {
    // Move the logic for getting one lab appointment here
    const userId = req.params.id;

    try {
        const labAppointment = await labAppoinment.findById(userId);
        res.status(200).json(labAppointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error", error: err.message });
    }
};

const getOneLabAppoinmentByNIC = async (req, res) => {
    // Move the logic for getting one lab appointment by NIC here
    const userNic = req.params.nic;

    try {
        const labAppointment = await labAppoinment.findOne({ nic: userNic });
        res.status(200).json(labAppointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error", error: err.message });
    }
};

module.exports = {
    createLabAppoinment,
    readLabAppoinment,
    updateLabAppoinment,
    deleteLabAppoinment,
    getOneLabAppoinment,
    getOneLabAppoinmentByNIC,
    upload,
};
