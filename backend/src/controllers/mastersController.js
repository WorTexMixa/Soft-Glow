const db = require('../config/db')

const getMasters = async (req, res) => {
  try {
    const [masters] = await db.query(`
      SELECT id, name, profession, experience, created_at
      FROM masters
      ORDER BY id DESC
    `)

    res.json(masters)
  } catch (error) {
    console.error('Get masters error:', error)

    res.status(500).json({
      message: 'Failed to get masters',
      error: error.message,
    })
  }
}

const createMaster = async (req, res) => {
  try {
    const { name, profession, experience } = req.body

    if (!name) {
      return res.status(400).json({
        message: 'Master name is required',
      })
    }

    if (!profession) {
      return res.status(400).json({
        message: 'Master profession is required',
      })
    }

    const [result] = await db.query(
      `
      INSERT INTO masters (name, profession, experience)
      VALUES (?, ?, ?)
      `,
      [name, profession, experience || null],
    )

    res.status(201).json({
      message: 'Master created successfully',
      master: {
        id: result.insertId,
        name,
        profession,
        experience: experience || null,
      },
    })
  } catch (error) {
    console.error('Create master error:', error)

    res.status(500).json({
      message: 'Failed to create master',
      error: error.message,
    })
  }
}

module.exports = {
  getMasters,
  createMaster,
}