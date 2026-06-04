const express = require("express");
const { getMasters } = require("../controllers/mastersController");

const router = express.Router();

router.get("/", getMasters);

module.exports = router;
