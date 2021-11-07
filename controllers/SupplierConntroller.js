const db = require('../models');
const sequelize = db.sequelize;
module.exports = {
  index: async (req, res) => {
    try {
      const value = await db.supplier.findAll()
      return res.json(value)
    } catch (e) {
      return res.status(500).json({ message: 'Cannot get data from database.' })
    }
  },
  store: async (req, res) => {
    const data = req.body
    if (data) {
      try {
        const oldName = await db.supplier.findOne({
          where: sequelize.where(
            sequelize.fn('lower', sequelize.col('name')),
            sequelize.fn('lower', data.name)
          )
        })
        if (oldName) {
          return res.status(200).json({ success: false, message: 'Name already exist. Pleasy try again' })
        }
        const value = await db.sequelize.transaction((t) => {
          return db.supplier.create(data, { transaction: t })
        })
        return res.status(201).json({ success: true, message: 'Supplier Created Successfully', value })
      } catch (e) {
        return res.status(500).json({ success: false, message: 'Cannot store data to database.' })
      }
    }
    return res.status(400).json({ message: 'Bad request.' })
  },
  update: async (req, res) => {
    try {
      const id = req.params.id
      const data = req.body
      console.log(data.id)
      if (id && data) {
        const body={
          name:data.name,
          status:data.status,
          updatedAt:new Date()
        }
        const result = await db.supplier.update(body, { where: { id: id } })
        return res.json({ success: true, message: 'Supplier Update Successfully ', result })
      } else {
        return res.status(400).json({ success: false, message: 'Bad request.' })
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message })
    }

  },
  destroy: async (req, res) => {
    const id = req.params.id
    if (id) {
      try {
        await db.supplier.destroy({ where: { id } })
        return res.send({ success: true, message: 'Delete Supplier Successfully' });
      } catch (e) {
        return res.status(500).json({ success: false, message: 'Cannot remove data from database.' })
      }
    } else {
      return res.status(400).json({ success: false, message: 'Bad request.' })
    }
  }
}