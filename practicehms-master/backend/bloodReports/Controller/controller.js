// controllers/bloodreportsController.js
const BloodReport = require('../Model/model');

const addBloodReport = async (req, res) => {
    const ID = req.body.ID;
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const doctor = req.body.doctor;
    const sampleType = req.body.sampleType;
    const processedDate = req.body.processedDate;
    const TechnologistName = req.body.TechnologistName;
    const WBC = Number(req.body.WBC);
    const NEUT = Number(req.body.NEUT);
    const LYMPH = Number(req.body.LYMPH);
    const MONO = Number(req.body.MONO);
    const EO = Number(req.body.EO);
    const BASO = Number(req.body.BASO);
    const RBC = Number(req.body.RBC);
    const HGB = Number(req.body.HGB);
    const HCT = Number(req.body.HCT);
    const MCV = Number(req.body.MCV);
    const status = 'noted';

    const newBloodReport = new BloodReport({
        ID,
        name,
        age,
        gender,
        doctor,
        sampleType,
        processedDate,
        TechnologistName,
        WBC,
        NEUT,
        LYMPH,
        MONO,
        EO,
        BASO,
        RBC,
        HGB,
        HCT,
        MCV,
        status,
    });

    try {
        await newBloodReport.save();
        res.json('Data successfully Added');
    } catch (err) {
        console.log(err);
    }
};

const readBloodReports = async (req, res) => {
    try {
        const bloodreports = await BloodReport.find();
        res.json(bloodreports);
    } catch (err) {
        console.log(err);
    }
};

const updateBloodReport = async (req, res) => {
    const userId = req.params.id;
    const {
        ID,
        name,
        age,
        gender,
        doctor,
        sampleType,
        processedDate,
        TechnologistName,
        WBC,
        NEUT,
        LYMPH,
        MONO,
        EO,
        BASO,
        RBC,
        HGB,
        HCT,
        MCV,
        status,
    } = req.body;

    const updateBloodReport = {
        ID,
        name,
        age,
        gender,
        doctor,
        sampleType,
        processedDate,
        TechnologistName,
        WBC,
        NEUT,
        LYMPH,
        MONO,
        EO,
        BASO,
        RBC,
        HGB,
        HCT,
        MCV,
        status,
    };

    try {
        await BloodReport.findByIdAndUpdate(userId, updateBloodReport);
        res.status(200).send({ status: 'Blood Report updated' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with updating data' });
    }
};

const deleteBloodReport = async (req, res) => {
    const userId = req.params.id;

    try {
        await BloodReport.findByIdAndDelete(userId);
        res.status(200).send({ status: 'Blood Report deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: 'Error with delete blood report', error: err.message });
    }
};

const getBloodReport = async (req, res) => {
    const userId = req.params.id;

    try {
        const bloodreport = await BloodReport.findById(userId);
        res.json(bloodreport);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: 'Error with get blood report', error: err.message });
    }
};

module.exports = {
    addBloodReport,
    readBloodReports,
    updateBloodReport,
    deleteBloodReport,
    getBloodReport,
};
