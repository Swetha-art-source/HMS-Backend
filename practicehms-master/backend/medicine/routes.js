// medicineRoutes.js

const express = require("express");
const router = express.Router();
const medicineController = require("./controller");
const upload = medicineController.upload;


router.route("/add", upload.single("file_path")).post(medicineController.addMedicine);
router.get("/", medicineController.getMedicines);
router.put("/update/:id", medicineController.updateMedicine);
router.get("/getNewMedicine/:id", medicineController.getMedicineById);
router.delete("/delete/:id", medicineController.deleteMedicine);

module.exports = router;
