const express = require("express");
const {
  getMasters,
  createMaster,
  updateMaster,
  deleteMaster,
} = require("../controllers/mastersController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { adminMiddleware } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getMasters);

router.post("/", authMiddleware, adminMiddleware, createMaster);
router.put("/:id", authMiddleware, adminMiddleware, updateMaster);
router.delete("/:id", authMiddleware, adminMiddleware, deleteMaster);

module.exports = router;
