// controllers/consultController.js
const VideoCon = require('./model');
const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'medixoehealth',
        pass: 'boupdtqanzqxslcg'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const createVideoConsultation = async (req, res) => {
    const { name, phone, specialist, mail, date } = req.body;

    const newCustomer = new VideoCon({
        name,
        phone,
        specialist,
        mail,
        date
    });

    const mailOptions = {
        from: 'medixoehealth@gmail.com',
        to: mail,
        subject: 'Registration Success',
        text: `Dear ${name},\n\nYou have registered to Medixo E-Health system successfully!!`
    };

    try {
        await newCustomer.save();
        res.status(200).json("Customer Added");

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("email sent: " + info.response);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json("Error adding customer");
    }
};

const getAllVideoConsultations = async (req, res) => {
    try {
        const consultations = await VideoCon.find();
        res.status(200).json(consultations);
    } catch (err) {
        console.error(err);
        res.status(500).json("Error reading consultations");
    }
};

const updateVideoConsultation = async (req, res) => {
    const userId = req.params.id;
    const { name, phone, specialist, mail, date } = req.body;

    const updateCustomer = {
        name,
        phone,
        specialist,
        mail,
        date
    };

    try {
        await VideoCon.findByIdAndUpdate(userId, updateCustomer);
        res.status(200).json({ status: "User update" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error with updating date" });
    }
};

const deleteVideoConsultation = async (req, res) => {
    const userId = req.params.id;

    try {
        await VideoCon.findByIdAndDelete(userId);
        res.status(200).json({ status: "User deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with delete user", error: err.message });
    }
};

const getOneVideoConsultation = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await VideoCon.findById(userId);
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with get user", error: err.message });
    }
};

module.exports = {
    createVideoConsultation,
    getAllVideoConsultations,
    updateVideoConsultation,
    deleteVideoConsultation,
    getOneVideoConsultation,
};
