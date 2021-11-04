'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    role_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.TEXT,
    name: DataTypes.STRING,
    department_id: DataTypes.STRING,
    ip: DataTypes.STRING,
    session_id: DataTypes.STRING,
    image_path: DataTypes.STRING,
    last_login: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};