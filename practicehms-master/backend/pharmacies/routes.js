// pharmacyRoutes.js

const express = require("express");
const router = express.Router();
const pharmacyController = require("./controller");
const upload = pharmacyController.upload;

router.route("/add").post(upload.single("file_path"), pharmacyController.addPharmacy);
router.get("/", pharmacyController.getPharmacies);
router.put("/update/:id", pharmacyController.updatePharmacy);
router.get("/getonePharmacy/:id", pharmacyController.getPharmacyById);
router.delete("/delete/:id", pharmacyController.deletePharmacy);

module.exports = router;
