'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatusDesc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  StatusDesc.init({
    Name: DataTypes.STRING,
    ColumnName: DataTypes.STRING,
    StatusNumber: DataTypes.INTEGER,
    StatusVarchar: DataTypes.STRING,
    Description: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StatusDesc',
  });
  return StatusDesc;
};