const express = require("express");
const {
  getMasters,
  createMaster,
  updateMaster,
} = require("../controllers/mastersController");

const router = express.Router();

router.get("/", getMasters);
router.post("/", createMaster);
router.put("/:id", updateMaster);

module.exports = router;
