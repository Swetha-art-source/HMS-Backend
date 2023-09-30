const express = require("express");
const router = express.Router();
const patientController = require("./controller");
const upload = patientController.upload;


router.route("/add").post(upload.single("file_path"), patientController.addPatient);
router.route("/").get(patientController.getAllPatients);
router.route("/update/:id").put(patientController.updatePatient);
router.route("/delete/:id").delete(patientController.deletePatient);
router.route("/get/:id").get(patientController.getPatientById);

module.exports = router;
