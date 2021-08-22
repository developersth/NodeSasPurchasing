'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Documents.init({
    DocNo: DataTypes.STRING,
    DocDate: DataTypes.DATE,
    Status: DataTypes.STRING,
    PoNo: DataTypes.STRING,
    PoFileName: DataTypes.STRING,
    PoFile: DataTypes.STRING,
    itemPR: DataTypes.JSON,
    ProductValue: DataTypes.DECIMAL,
    Currency: DataTypes.STRING,
    Buyer: DataTypes.STRING,
    Supplier: DataTypes.STRING,
    Details: DataTypes.STRING,
    PaymentTerm: DataTypes.STRING,
    DeliveryTerm: DataTypes.STRING,
    Remarks: DataTypes.STRING,
    OrderAckFileName: DataTypes.STRING,
    OrderAckFile: DataTypes.STRING,
    DeliveryDate: DataTypes.STRING,
    InvoiceNo: DataTypes.STRING,
    InvoiceFileName: DataTypes.STRING,
    InvoiceFile: DataTypes.STRING,
    PackingListNo: DataTypes.STRING,
    PackingListFileName: DataTypes.STRING,
    PackingListFile: DataTypes.STRING,
    FreightForworder: DataTypes.STRING,
    BillOfLadingNo: DataTypes.STRING,
    BillOfLadingFileName: DataTypes.STRING,
    BillOfLadingFile: DataTypes.STRING,
    AirWayBillNo: DataTypes.STRING,
    AirWayBillFileName: DataTypes.STRING,
    AirWayBillFile: DataTypes.STRING,
    TaxInvoiceNo: DataTypes.STRING,
    TaxInvoiceFileName: DataTypes.STRING,
    TaxInvoiceFile: DataTypes.STRING,
    TaxValue: DataTypes.DECIMAL,
    FreightInvoiceNo: DataTypes.STRING,
    FreightInvoiceFileName: DataTypes.STRING,
    FreightInvoiceFile: DataTypes.STRING,
    FreightInvoiceValue: DataTypes.DECIMAL,
    DeliveryNoticeFile: DataTypes.STRING,
    createBy: DataTypes.STRING,
    updateBy: DataTypes.STRING,
    fileManage:DataTypes.JSON,
    DocPath: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Documents',
  });
  return Documents;
};