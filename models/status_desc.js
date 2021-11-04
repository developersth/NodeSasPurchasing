'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class status_desc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  status_desc.init({
    Name: DataTypes.STRING,
    ColumnName: DataTypes.STRING,
    StatusNumber: DataTypes.INTEGER,
    StatusVarchar: DataTypes.STRING,
    Description: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'status_desc',
  });
  return status_desc;
};