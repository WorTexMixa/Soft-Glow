const db = require("../config/db");

const getAppointments = async (req, res) => {
  try {
    const [appointments] = await db.query(`
      SELECT
        appointments.id,
        appointments.name,
        appointments.phone,
        appointments.service_id,
        services.title AS service_title,
        appointments.master_id,
        masters.name AS master_name,
        masters.profession AS master_profession,
        DATE_FORMAT(appointments.appointment_date, '%Y-%m-%d') AS date,
        TIME_FORMAT(appointments.appointment_time, '%H:%i') AS time,
        appointments.comment,
        appointments.status,
        appointments.user_id,
        users.name AS user_name,
        users.email AS user_email,
        appointments.created_at
      FROM appointments
      LEFT JOIN services ON appointments.service_id = services.id
      LEFT JOIN masters ON appointments.master_id = masters.id
      LEFT JOIN users ON appointments.user_id = users.id
      ORDER BY appointments.id DESC
    `);

    res.json(appointments);
  } catch (error) {
    console.error("Get appointments error:", error);

    res.status(500).json({
      message: "Failed to get appointments",
      error: error.message,
    });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    const [appointments] = await db.query(
      `
      SELECT
        appointments.id,
        appointments.name,
        appointments.phone,
        appointments.service_id,
        services.title AS service_title,
        appointments.master_id,
        masters.name AS master_name,
        masters.profession AS master_profession,
        DATE_FORMAT(appointments.appointment_date, '%Y-%m-%d') AS date,
        TIME_FORMAT(appointments.appointment_time, '%H:%i') AS time,
        appointments.comment,
        appointments.status,
        appointments.user_id,
        appointments.created_at
      FROM appointments
      LEFT JOIN services ON appointments.service_id = services.id
      LEFT JOIN masters ON appointments.master_id = masters.id
      WHERE appointments.user_id = ?
      ORDER BY appointments.id DESC
      `,
      [userId],
    );

    res.json(appointments);
  } catch (error) {
    console.error("Get my appointments error:", error);

    res.status(500).json({
      message: "Failed to get my appointments",
      error: error.message,
    });
  }
};

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
  getAppointments,
  getMyAppointments,
  createAppointment,
};
