const express = require("express");
const {
  getAppointments,
  getMyAppointments,
  createAppointment,
} = require("../controllers/appointmentsController");
const {
  optionalAuthMiddleware,
} = require("../middleware/optionalAuthMiddleware");
const { authMiddleware } = require("../middleware/authMiddleware");
const { adminMiddleware } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/my", authMiddleware, getMyAppointments);
router.get("/", authMiddleware, adminMiddleware, getAppointments);
router.post("/", optionalAuthMiddleware, createAppointment);

module.exports = router;
