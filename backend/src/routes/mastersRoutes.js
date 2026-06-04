const express = require("express");
const {
  getMasters,
  createMaster,
} = require("../controllers/mastersController");

const router = express.Router();

router.get("/", getMasters);
router.post("/", createMaster);

module.exports = router;
