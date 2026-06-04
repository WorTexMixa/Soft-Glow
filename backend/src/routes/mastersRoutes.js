const express = require("express");
const {
  getMasters,
  createMaster,
  updateMaster,
  deleteMaster,
} = require("../controllers/mastersController");

const router = express.Router();

router.get("/", getMasters);
router.post("/", createMaster);
router.put("/:id", updateMaster);
router.delete("/:id", deleteMaster);

module.exports = router;
