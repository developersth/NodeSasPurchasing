const db = require('../models');

module.exports = {
  index: async (req, res) => {
    try {
      const value = await db.Payment.findAll()
      if (value.itemPR)
        value.itemPR = JSON.parse(data.itemPR)
      return res.json(value)
    } catch (e) {
      return res.status(500).json({ message: 'Cannot get data from database.' })
    }
  },
  findById: async (req, res) => {
    try {
      const id = req.params.id
      const value = await db.Payment.findByPk(id)

      if (value) {
        if (value.itemPR)
          value.itemPR = JSON.parse(value.itemPR)
        return res.json(value)
      }
      else {
        return res.status(404).json({ message: 'No Data Not found.' })
      }

    } catch (e) {
      return res.status(500).json({ message: 'Cannot get data from database.' })
    }
  },
  store: async (req, res) => {
    const data = req.body
    if (data) {
      try {
        if (data.itemPR) {
          data.itemPR = JSON.parse(data.itemPR)
        }
        const value = await db.sequelize.transaction((t) => {
          return db.Payment.create(data, { transaction: t })
        })
        return res.status(201).json({ success: true, message: 'Payment Created Successfully', value })
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
      if (data.itemPR) {
        data.itemPR = JSON.parse(data.itemPR)
      }
      const result = await db.Payment.update(data, { where: { id: id } })
      console.log(result)
      return res.json({ success: true, message: 'Payment Update Successfully ', result })
    }
    return res.status(400).json({ success: false, message: 'Bad request.' })
  },
  destroy: async (req, res) => {
    const id = req.params.id
    if (id) {
      try {
        await db.Payment.destroy({ where: { id } })
        return res.send({ success: true, message: 'Delete Payment Successfully' });
      } catch (e) {
        return res.status(200).json({ success: false, message: 'Cannot remove data from database.' })
      }
    } else {
      return res.status(400).json({ success: false, message: 'Bad request.' })
    }
  }
}