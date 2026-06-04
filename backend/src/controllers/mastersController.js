const db = require("../config/db");

const getMasters = async (req, res) => {
  try {
    const [masters] = await db.query(`
      SELECT id, name, profession, experience, created_at
      FROM masters
      ORDER BY id DESC
    `);

    res.json(masters);
  } catch (error) {
    console.error("Get masters error:", error);

    res.status(500).json({
      message: "Failed to get masters",
      error: error.message,
    });
  }
};

const createMaster = async (req, res) => {
  try {
    const { name, profession, experience } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Master name is required",
      });
    }

    if (!profession) {
      return res.status(400).json({
        message: "Master profession is required",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO masters (name, profession, experience)
      VALUES (?, ?, ?)
      `,
      [name, profession, experience || null],
    );

    res.status(201).json({
      message: "Master created successfully",
      master: {
        id: result.insertId,
        name,
        profession,
        experience: experience || null,
      },
    });
  } catch (error) {
    console.error("Create master error:", error);

    res.status(500).json({
      message: "Failed to create master",
      error: error.message,
    });
  }
};

const updateMaster = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, profession, experience } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Master name is required",
      });
    }

    if (!profession) {
      return res.status(400).json({
        message: "Master profession is required",
      });
    }

    const [result] = await db.query(
      `
      UPDATE masters
      SET name = ?, profession = ?, experience = ?
      WHERE id = ?
      `,
      [name, profession, experience || null, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Master not found",
      });
    }

    res.json({
      message: "Master updated successfully",
      master: {
        id: Number(id),
        name,
        profession,
        experience: experience || null,
      },
    });
  } catch (error) {
    console.error("Update master error:", error);

    res.status(500).json({
      message: "Failed to update master",
      error: error.message,
    });
  }
};

const deleteMaster = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `
      DELETE FROM masters
      WHERE id = ?
      `,
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Master not found",
      });
    }

    res.json({
      message: "Master deleted successfully",
      deletedMasterId: Number(id),
    });
  } catch (error) {
    console.error("Delete master error:", error);

    res.status(500).json({
      message: "Failed to delete master",
      error: error.message,
    });
  }
};

module.exports = {
  getMasters,
  createMaster,
  updateMaster,
  deleteMaster,
};
