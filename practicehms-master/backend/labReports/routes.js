// reportRoutes.js

const express = require("express");
const router = express.Router();
const reportController = require("./controller");
const upload = reportController.upload;


router.post("/add", upload.single("filepath"), reportController.addReport);
router.get("/", reportController.getReports);
router.put("/update/:id", reportController.updateReport);
router.delete("/delete/:id", reportController.deleteReport);
router.get("/get/:id", reportController.getReportById);

module.exports = router;
