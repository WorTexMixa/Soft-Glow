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

module.exports = {
  getMasters,
};
