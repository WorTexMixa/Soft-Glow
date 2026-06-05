const db = require("../config/db");

const createAppointment = async (req, res) => {
  try {
    const { name, phone, service_id, master_id, date, time, comment } =
      req.body;

    if (!name || !phone || !service_id || !master_id || !date || !time) {
      return res.status(400).json({
        message: "Name, phone, service, master, date and time are required",
      });
    }

    const [services] = await db.query(
      `
      SELECT id
      FROM services
      WHERE id = ?
      `,
      [service_id],
    );

    if (services.length === 0) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    const [masters] = await db.query(
      `
      SELECT id
      FROM masters
      WHERE id = ?
      `,
      [master_id],
    );

    if (masters.length === 0) {
      return res.status(404).json({
        message: "Master not found",
      });
    }

    const userId = req.user ? req.user.id : null;

    const [result] = await db.query(
      `
      INSERT INTO appointments
        (name, phone, service_id, master_id, appointment_date, appointment_time, comment, status, user_id)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        phone,
        service_id,
        master_id,
        date,
        time,
        comment || null,
        "pending",
        userId,
      ],
    );

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: {
        id: result.insertId,
        name,
        phone,
        service_id,
        master_id,
        date,
        time,
        comment: comment || null,
        status: "pending",
        user_id: userId,
      },
    });
  } catch (error) {
    console.error("Create appointment error:", error);

    res.status(500).json({
      message: "Failed to create appointment",
      error: error.message,
    });
  }
};

module.exports = {
  createAppointment,
};
