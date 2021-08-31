const db = require('../models');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");//condition
const sequelize = db.sequelize;
const config = require('../config/config.json')
let userProfile;
module.exports = {
  index: async (req, res) => {
    try {
      let sql =`select
                  users.id,
                  role_id,
                  u.name  as role_name,
                  username,
                  mobile,
                  email,
                  users.name,
                  department_id,
                  ip,
                  session_id,
                  image_path,
                  last_login,
                  users.status,
                  users.createdAt,
                  users.updatedAt
                from
                  users
                  left join userroles u
                  on users.role_id  = u.id`
      const result = await sequelize.query(sql, { type: QueryTypes.SELECT });
      return res.json(result)
    } catch (e) {
      return res.status(500).json({ message: 'Cannot get data from database.' })
    }
  },
  findNameUsers: async (req, res) => {
    try {
      const user = await db.Users.findAll({
        attributes: ['name']
      })
      return res.json(user)
    } catch (e) {
      return res.status(500).json({ message: 'Cannot get data from database.' })
    }
  },
  me: async (req, res) => {
    try {
      return res.status(200).json({
        user: {
          id: userProfile.id,
          username: userProfile.username,
          name: userProfile.name,
          email: userProfile.email,
          mobile: userProfile.mobile,
          type: userProfile.type,
        },
      });
    } catch (e) {
      return res.status(500).json({ message: 'Cannot get data from database.' })
    }
  },
  login: async (req, res) => {
    //const data = req.body;
    // query db.
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    ip = ip.replace('::ffff:', '');
    if (!req.body.username || !req.body.password) return res.status(400).send({ success: false, message: 'Invalid Paramiters.' })
    let user = await db.Users.findOne({where: {username: req.body.username} });
    if (!user) return res.status(400).send({ success: false, message: 'Invalid Username or Password.' })
    if (user) {
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) return res.status(200).send({ success: false, message: 'Password is wrong.' })
      else {
        let userRole = await db.UserRole.findByPk(user.role_id);
        // Send JWT
        // Create and assign token
        //const signUser = {username:user.username}
        const token = jwt.sign(req.body, 'your_jwt_secret',{expiresIn:'4h'});
        const data = {
          success: true,
          message: "Login Succesfully",
          user: {
            token: token,
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            type: userRole.name,
          }
        };
        userProfile = data.user;
        await db.Users.update({ ip: ip, token: token, last_login: new Date() }, { where: { id: user.id } })
        return res.json(data)
      }

    } else {
      return res.status(200).json({ success: false, message: 'data not found ' });
    }

  },
  logout: async (req, res) => {
    return res.json({ success: true, message: 'OK' })
  },
  store: async (req, res) => {
    const data = req.body
    if (data) {
      try {
        const oldUser = await db.Users.findOne({ where: { username: data.username } })
        if(oldUser){
          return res.status(200).json({ success: false, message: 'User already exist. Pleasy try again' })
        }

        const passwordHash = bcrypt.hashSync(data.password, 10);
        data.password = passwordHash
        const users = await db.sequelize.transaction((t) => {
          return db.Users.create(data, { transaction: t })
        })
        return res.status(201).json({ success: true, message: 'User Created Successfully', users })
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
      const passwordHash = bcrypt.hashSync(data.password, 10);
      data.password = passwordHash
      const result = await db.Users.update(data, { where: { id: id } })
      console.log(result)
      return res.json({ success: true, message: 'User Update Successfully ', result })
    }
    return res.status(400).json({ success: false, message: 'Bad request.' })
  },
  destroy: async (req, res) => {
    const id = req.params.id
    if (id) {
      try {
        await db.Users.destroy({ where: { id } })
        return res.send({ success: true, message: 'Delete User Successfully' });
      } catch (e) {
        return res.status(500).json({ success: false, message: 'Cannot remove data from database.' })
      }
    } else {
      return res.status(400).json({ success: false, message: 'Bad request.' })
    }
  }
}