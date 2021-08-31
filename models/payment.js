'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Payment.init({
    PaymentDate: DataTypes.DATE,
    Status: DataTypes.STRING,
    PaymentName: DataTypes.STRING,
    PaymentTo: DataTypes.STRING,
    PurposeId: DataTypes.INTEGER,
    PurposeName: DataTypes.STRING,
    PurposeOther: DataTypes.STRING,
    PoNo: DataTypes.STRING,
    PRNo: DataTypes.STRING,
    InvoiceNo: DataTypes.STRING,
    AirWayBillNo: DataTypes.STRING,
    itemPR: DataTypes.JSON,
    PriceTotal: DataTypes.DECIMAL,
    createBy: DataTypes.STRING,
    updateBy:  DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};