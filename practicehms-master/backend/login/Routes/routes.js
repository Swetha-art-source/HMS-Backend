const express = require("express");
const router = express.Router();
const authController = require("../Controller/controller");

router.route("/login").post(authController.login);

module.exports = router;