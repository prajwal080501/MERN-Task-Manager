const express = require("express");
const { auth } = require("../controllers/userController.js");

const router = express.Router();

router.post("/", auth);

module.exports = router;
