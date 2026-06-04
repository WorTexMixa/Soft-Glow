const express = require("express");
const {
  getServices,
  createService,
  updateService,
} = require("../controllers/servicesController");

const router = express.Router();

router.get("/", getServices);
router.post("/", createService);
router.put("/:id", updateService);

module.exports = router;
