const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const servicesRoutes = require("./routes/servicesRoutes");
const mastersRoutes = require("./routes/mastersRoutes");
const authRoutes = require("./routes/authRoutes");
const appointmentsRoutes = require("./routes/appointmentsRoutes");

const { notFoundMiddleware } = require("./middleware/notFoundMiddleware");
const { errorMiddleware } = require("./middleware/errorMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    message: "Soft Glow backend is working",
    status: "OK",
  });
});

app.get("/api/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");

    res.json({
      message: "Database connection is working",
      result: rows[0].result,
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
});

app.use("/api/services", servicesRoutes);
app.use("/api/masters", mastersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentsRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
