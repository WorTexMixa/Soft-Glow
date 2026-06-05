const express = require("express");
const {
  getServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/servicesController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { adminMiddleware } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getServices);

router.post("/", authMiddleware, adminMiddleware, createService);
router.put("/:id", authMiddleware, adminMiddleware, updateService);
router.delete("/:id", authMiddleware, adminMiddleware, deleteService);

module.exports = router;
