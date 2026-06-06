const express = require("express");
const {
  getAppointments,
  getMyAppointments,
  createAppointment,
  updateAppointmentStatus,
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
router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateAppointmentStatus,
);

module.exports = router;
