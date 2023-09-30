const express = require("express");
const router = express.Router();
const updateTotalController = require("../Controller/controller");
const upload = updateTotalController.upload;

router.route("/add").post(upload.single("file_path"), updateTotalController.addUpdateTotal);
router.route("/").get(updateTotalController.getAllUpdateTotals);
router.route("/update/:id").put(updateTotalController.updateUpdateTotal);
router.route("/delete/:id").delete(updateTotalController.deleteUpdateTotal);

module.exports = router;
