'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  event_log.init({
    itemNo: DataTypes.INTEGER,
    doc_no: DataTypes.STRING,
    event_date: DataTypes.DATE,
    status: DataTypes.STRING,
    details: DataTypes.STRING,
    record_date: DataTypes.DATE,
    remark: DataTypes.STRING,
    update_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'event_log',
  });
  return event_log;
};