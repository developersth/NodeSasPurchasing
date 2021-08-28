const db = require('../models');

module.exports = {
  index: async (req, res) => {
    try {
      const value = await db.UserRole.findAll()
      return res.json(value)
    } catch (e) {
      return res.status(500).json({ message: 'Cannot get data from database.' })
    }
  },
  store: async (req, res) => {
    const data = req.body
    if (data) {
      try {
        const value = await db.sequelize.transaction((t) => {
          return db.UserRole.create(data, { transaction: t })
        })
        return res.status(201).json({ success: true, message: 'UserRole Created Successfully', value })
      } catch (e) {
        return res.status(500).json({ success: false, message: 'Cannot store data to database.' })
      }
    }
    return res.status(400).json({ message: 'Bad request.' })
  },
  update: async (req, res) => {
    const id = req.params.id
    const data = req.body
    if (id && data) {
      const result = await db.UserRole.update(data, { where: { id: id } })
      console.log(result)
      return res.json({ success: true, message: 'UserRole Update Successfully ', result })
    }
    return res.status(400).json({ success: false, message: 'Bad request.' })
  },
  destroy: async (req, res) => {
    const id = req.params.id
    if (id) {
      try {
        await db.UserRole.destroy({ where: { id } })
        return res.send({ success: true, message: 'Delete UserRole Successfully' });
      } catch (e) {
        return res.status(500).json({ success: false, message: 'Cannot remove data from database.' })
      }
    } else {
      return res.status(400).json({ success: false, message: 'Bad request.' })
    }
  }
}