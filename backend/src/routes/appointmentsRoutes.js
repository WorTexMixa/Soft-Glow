const express = require("express");
const { createAppointment } = require("../controllers/appointmentsController");
const {
  optionalAuthMiddleware,
} = require("../middleware/optionalAuthMiddleware");

const router = express.Router();

router.post("/", optionalAuthMiddleware, createAppointment);

module.exports = router;
