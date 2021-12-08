const db = require('../models');
const fn = require('../plugins/utils');
var fs = require('fs');
var dateFormat = require("dateformat");
var now = new Date();
const env = process.env.NODE_ENV || 'development';
//const config = require('../config/config.json')
const config = require(__dirname + '/../config/config.json')[env];
const { Op } = require("sequelize");
const sequelize = db.sequelize;
module.exports = {
  index: async (req, res) => {
    try {
      let sql = `select
                    pm.id,
                    DocNo,
                    DocDate,
                    Status,
                    sd.Description as StatusName,
                    sd.Color,
                    PoNo,
                    PoFileName,
                    PoFile,
                    itemPR,
                    ProductValue,
                    Currency,
                    Buyer,
                    Supplier,
                    Details,
                    PaymentTerm,
                    DeliveryTerm,
                    Remarks,
                    OrderAckFileName,
                    OrderAckFile,
                    DeliveryDate,
                    InvoiceNo,
                    InvoiceFileName,
                    InvoiceFile,
                    PackingListNo,
                    PackingListFileName,
                    PackingListFile,            
                    fileManage,
                    DocPath,
                    itemImport,
                    createBy,
                    pm.updateBy,
                    pm.createdAt,
                    pm.updatedAt
                  from
                    po_managements pm
                  left join status_desc sd on
                    pm.Status = sd.StatusVarchar
                  where
                    sd.Name = 'PO_MANAGEMENT'
                    and sd.ColumnName = 'P_STATUS' 
                    ORDER BY pm.DocNo DESC`
      //const docs = await sequelize.query(sql, { type: Op.SELECT });
      const docs = await sequelize.query(sql, { type: Op.SELECT });
      const result = docs[0].map((doc) => {
        if (doc.PoFile)
          doc.PoFile = config.baseURL + doc.PoFile
        if (doc.OrderAckFile)
          doc.OrderAckFile = config.baseURL + doc.OrderAckFile
        if (doc.InvoiceFile)
          doc.InvoiceFile = config.baseURL + doc.InvoiceFile
        if (doc.PackingListFile)
          doc.PackingListFile = config.baseURL + doc.PackingListFile
       /*  if (doc.itemPR) {
          //doc.itemPR = JSON.parse(JSON.stringify(doc.itemPR))
          doc.itemPR = JSON.parse(doc.itemPR)
          for (const key in doc.itemPR) {
            doc.itemPR[key].PRFile = config.baseURL + doc.DocPath + doc.itemPR[key].PRFileName
            if (doc.itemPR[key].PRFileName) {
            }
          }
        } */
       /*  if (doc.fileManage) {
          //doc.fileManage = JSON.parse(JSON.stringify(doc.fileManage))
          doc.fileManage = JSON.parse(doc.fileManage)
        } */
        return {
          id: doc.id,
          DocNo: doc.DocNo,
          DocDate: doc.DocDate,
          Status: doc.Status,
          StatusName: doc.StatusName,
          Color: doc.Color,
          PoNo: doc.PoNo,
          PoFileName: doc.PoFileName,
          PoFile: doc.PoFile,
          ProductValue: doc.ProductValue,
          Currency: doc.Currency,
          Buyer: doc.Buyer,
          Supplier: doc.Supplier,
          Details: doc.Details,
          PaymentTerm: doc.PaymentTerm,
          DeliveryTerm: doc.DeliveryTerm,
          Remarks: doc.Remarks,
          OrderAckFileName: doc.OrderAckFileName,
          OrderAckFile: doc.OrderAckFile,
          DeliveryDate: doc.DeliveryDate,
          InvoiceNo: doc.InvoiceNo,
          InvoiceFileName: doc.InvoiceFileName,
          InvoiceFile: doc.InvoiceFile,
          PackingListNo: doc.PackingListNo,
          PackingListFileName: doc.PackingListFileName,
          PackingListFile: doc.PackingListFile,
          createBy: doc.createBy,
          updateBy: doc.updateBy,
          DocPath: doc.DocPath,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        }
      })
      return res.json(result)
    } catch (e) {
      return res.status(500).json({ message: e.message })
    }
  },

  findById: async (req, res) => {
    try {
      const id = req.params.id
      const doc = await db.po_managements.findByPk(id)
      if (doc) {
        if (doc.PoFileName)
          doc.PoFileURL = config.baseURL + doc.DocPath + doc.PoFileName
        if (doc.OrderAckFileName)
          doc.OrderAckFileURL = config.baseURL + doc.DocPath + doc.OrderAckFileName
        if (doc.InvoiceFileName)
          doc.InvoiceFileURL = config.baseURL + doc.DocPath + doc.InvoiceFileName
        if (doc.PackingListFileName)
          doc.PackingListFileURL = config.baseURL + doc.DocPath + doc.PackingListFileName
        if (doc.itemPR) {
          //doc.itemPR = JSON.parse(JSON.stringify(doc.itemPR))
          //doc.itemPR = JSON.parse(doc.itemPR)
          for (const key in doc.itemPR) {
            if (doc.itemPR[key].PRFileName) {
              doc.itemPR[key].PRFileURL = config.baseURL + doc.DocPath + doc.itemPR[key].PRFileName
            }
          }
        }
        if (doc.fileManage) {
          //doc.fileManage = JSON.parse(JSON.stringify(doc.fileManage))
          //doc.fileManage = JSON.parse(doc.fileManage)
        }
        if (doc.itemImport) {
          //doc.itemImport = JSON.parse(JSON.stringify(doc.itemImport))
          //doc.itemImport = JSON.parse(doc.itemImport)
          for (const key in doc.itemImport) {
            if (doc.itemImport[key].BillOfLadingFileName) {
              doc.itemImport[key].BillOfLadingFileURL = config.baseURL + doc.DocPath + doc.itemImport[key].BillOfLadingFileName
            }
            if (doc.itemImport[key].AirWayBillFileName) {
              doc.itemImport[key].AirWayBillFileURL = config.baseURL + doc.DocPath + doc.itemImport[key].AirWayBillFileName
            }
            if (doc.itemImport[key].TaxInvoiceFileName) {
              doc.itemImport[key].TaxInvoiceFileURL = config.baseURL + doc.DocPath + doc.itemImport[key].TaxInvoiceFileName
            }
            if (doc.itemImport[key].FreightInvoiceFileName) {
              doc.itemImport[key].FreightInvoiceFileURL = config.baseURL + doc.DocPath + doc.itemImport[key].FreightInvoiceFileName
            }
            if (doc.itemImport[key].DeliveryNoticeFileName) {
              doc.itemImport[key].DeliveryNoticeFileURL = config.baseURL + doc.DocPath + doc.itemImport[key].DeliveryNoticeFileName
            }
          }
        }
        const itemEventLog = await db.event_log.findAll({where:{doc_no:doc.DocNo}})
        const result = {
          id: doc.id,
          DocNo: doc.DocNo,
          DocDate: doc.DocDate,
          Status: doc.Status,
          PoNo: doc.PoNo,
          PoFileName: doc.PoFileName,
          PoFile: doc.PoFile,
          PoFileURL: doc.PoFileURL,
          itemPR: doc.itemPR,
          ProductValue: doc.ProductValue,
          Currency: doc.Currency,
          Buyer: doc.Buyer,
          Supplier: doc.Supplier,
          Details: doc.Details,
          PaymentTerm: doc.PaymentTerm,
          DeliveryTerm: doc.DeliveryTerm,
          Remarks: doc.Remarks,
          OrderAckFileName: doc.OrderAckFileName,
          OrderAckFile: doc.OrderAckFile,
          OrderAckFileURL: doc.OrderAckFileURL,
          DeliveryDate: doc.DeliveryDate,
          InvoiceNo: doc.InvoiceNo,
          InvoiceFileName: doc.InvoiceFileName,
          InvoiceFile: doc.InvoiceFile,
          InvoiceFileURL: doc.InvoiceFileURL,
          PackingListNo: doc.PackingListNo,
          PackingListFileName: doc.PackingListFileName,
          PackingListFile: doc.PackingListFile,
          PackingListFileURL: doc.PackingListFileURL,
          createBy: doc.createBy,
          updateBy: doc.updateBy,
          DocPath: doc.DocPath,
          fileManage: doc.fileManage,
          itemImport: doc.itemImport,
          itemEventLog:itemEventLog,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        }
        return res.json(result)
      }
      return res.json({ status: false, message: 'No data from database.' })

    } catch (e) {
      return res.status(500).json({ message: 'Cannot get data from database.' })
    }
  },
  findPoNo: async (req, res) => {
    try {
      const payname = req.query.payname
      const result = await db.po_managements.findAll({ attributes: ['PoNo', 'Supplier'], where: { [Op.or]: [{ Supplier: payname }, { FreightForworder: payname }] }, order: [['createdAt', 'DESC']] })
      return res.json(result)
    } catch (e) {
      return res.status(500).json({ message: 'Cannot get data from database.' })
    }
  },
  findDataByPoNo: async (req, res) => {
    try {
      const pono = req.params.pono
      const result = await db.po_managements.findOne({ where: { PoNo: pono } })
      if (result) {
        if (result.itemPR)
          result.itemPR = JSON.parse(result.itemPR)
        const body = {
          docId: result.DocNo,
          PoNo: result.PoNo,
          itemPR: result.itemPR,
          InvoiceNo: result.InvoiceNo,
          AirWayBillNo: result.AirWayBillNo
        }
        return res.json(body)
      } else {
        return res.status(404).json({ message: 'no data from database.' })
      }

    } catch (e) {
      return res.status(500).json({ message: 'Cannot  get data from database.' })
    }
  },
  findPoNo: async (req, res) => {
    try {
      const payname = req.query.payname
      const result = await db.po_managements.findAll({ attributes: ['PoNo', 'Supplier'], where: { [Op.or]: [{ Supplier: payname }, { FreightForworder: payname }] }, order: [['createdAt', 'DESC']] })
      return res.json(result)
    } catch (e) {
      return res.status(500).json({ message: 'Cannot get data from database.' })
    }
  },
  exportExcel: async (req, res) => {
    try {
      const data = req.body
      const itemId = []
      data.forEach(el => { itemId.push(el.id) });
      const result = await db.po_managements.findAll({ where: { id: { [Op.in]: itemId } } })
      const body = []
      if (result) {
        result.forEach(doc => {
          if (doc) {
            let itemPR = JSON.parse(doc.itemPR)
            itemPR.forEach((item, index) => {
              let pono
              if (index !== 0)
                pono = ''
              else
                pono = doc.PoNo
              body.push({
                "PO No.": pono,
                "PR No.": item.PRNo,
                "Job No.": item.JobNo,
                FROM: '',
                Supplier: doc.Supplier,
                item: index + 1,
                "Delivery Date": doc.DeliveryDate,
                AWB: doc.AirWayBillNo,
                Freight: doc.FreightForworder,
                "เลขที่ใบขน": doc.BillOfLadingNo,
                Status: doc.Status,
                "แจ้งรับของ (เรา)": '',
                "พี่โจ้แจ้งรับ": '',
                "T/T status": '',
                "INVOICE NO.": doc.InvoiceNo,
                "ค่าภาษี": 'ทำจ่ายแล้ว',
                "ค่า Freight": '',
                "FREIGHT INV NO.": doc.FreightInvoiceNo
              })
            });
          }



        });

        return res.json(body)
      } else {
        return res.status(404).json({ message: 'no data from database.' })
      }

    } catch (e) {
      return res.status(500).json({ message: 'Cannot  get data from database.' })
    }
  },

  store: async (req, res) => {
    const data = req.body
    //data.itemPR=JSON.parse(data.itemPR)
    //let test =req.body.files

    //return res.status(200).json({ success: true, message: 'Upload File Successfully' })

    if (data) {
      try {
        let DocNo = ''
        let id = 0

        if (data.itemPR) {
          data.itemPR = JSON.parse(data.itemPR)
        }
        if (data.fileManage) {
          data.fileManage = JSON.parse(data.fileManage)
        }
        if (data.itemImport) {
          for (const key in data.itemImport) {
          }
          data.itemImport = JSON.parse(data.itemImport)
        }
        if (data.DeliveryDate) {
          if (data.DeliveryDate === 'null')
            data.DeliveryDate = null
        }
        const body = {
          Status: data.Status,
          PoNo: data.PoNo,
          DocDate: data.DocDate,
          ProductValue: data.ProductValue || 0,
          Currency: data.Currency,
          Buyer: data.Buyer,
          Supplier: data.Supplier,
          Details: data.Details,
          PaymentTerm: data.PaymentTerm,
          DeliveryTerm: data.DeliveryTerm,
          Remarks: data.Remarks,
          DeliveryDate: data.DeliveryDate,
          InvoiceNo: data.InvoiceNo,
          PackingListNo: data.PackingListNo,
          itemPR: data.itemPR,
          fileManage: data.fileManage,
          itemImport: data.itemImport
        }
        const docs = await db.sequelize.transaction((t) => {
          return db.po_managements.create(body, { transaction: t }).then(result => id = result.id)
        })

        DocNo = fn.formatDocNo(id)  //รูปแบบรหัสเอกสาร
        var oldPath = config.documents.tempfiles
        var newPath = config.documents.dir + dateFormat(now, "yyyy") + '/' + dateFormat(now, "mm") + '/' + DocNo + '/'
        if (!fs.existsSync(newPath)) {
          fn.createDirectory(newPath)
        }
        if (await req.files) {
          for (const key in req.files) {
            fs.rename(req.files[key].path, newPath + '/' + req.files[key].originalname, function (err) {
              if (err) { console.log(err) }
              console.log(`Move file ${req.files[key].originalname} complete.`)
            })
          }
        }

        let DocPath = newPath
        if (data.fileManage) { //Update file name and path file
          for (const key in data.fileManage) {
            if (data.fileManage[key].name === 'PoFile') {
              data.PoFileName = data.fileManage[key].filename
              data.PoFile = newPath + data.fileManage[key].filename
            }
            if (data.fileManage[key].name === 'OrderAckFile') {
              data.OrderAckFileName = data.fileManage[key].filename
              data.OrderAckFile = newPath + data.fileManage[key].filename
            }
            if (data.fileManage[key].name === 'InvoiceFile') {
              data.InvoiceFileName = data.fileManage[key].filename
              data.InvoiceFile = newPath + data.fileManage[key].filename
            }
            if (data.fileManage[key].name === 'PackingListFile') {
              data.PackingListFileName = data.fileManage[key].filename
              data.PackingListFile = newPath + data.fileManage[key].filename
            }

          }
        }
        const docfile = {
          DocNo: DocNo,
          DocPath: DocPath,
          PoFileName: data.PoFileName,
          PoFile: data.PoFile,
          OrderAckFileName: data.OrderAckFileName,
          OrderAckFile: data.OrderAckFile,
          InvoiceFileName: data.InvoiceFileName,
          InvoiceFile: data.InvoiceFile,
          PackingListFileName: data.PackingListFileName,
          PackingListFile: data.PackingListFile
        }
        await db.po_managements.update(docfile, { where: { id: id } }) //update DocNo.
        //Event Log
        if (data.itemEventLog) {
          data.itemEventLog = JSON.parse(data.itemEventLog)
          const itemEventLog = []
          for (var key in data.itemEventLog) {
            itemEventLog.push({
              doc_no: DocNo,
              itemNo: data.itemEventLog[key].itemNo,
              status: data.itemEventLog[key].status,
              details: data.itemEventLog[key].details,
              event_date: data.itemEventLog[key].event_date,
              record_date: new Date(),
              remark: data.itemEventLog[key].remark,
              status: data.itemEventLog[key].status,
            })
          }
          const event_log = await db.sequelize.transaction((t) => {
            return db.event_log.bulkCreate(itemEventLog, { transaction: t })
          })
        }
        return res.status(201).json({ success: true, message: 'po_managements Created Successfully', docs })
      } catch (e) {
        return res.json({ success: false, message: 'Cannot store data to database.' })
      }
    }
    return res.status(400).json({ success: false, message: 'Bad request.' })
  },
  update: async (req, res) => {
    const id = req.params.id
    const data = req.body
    if (id && data) {
      try {
        let DocNo = ''
        //let id = 1

        if (data.itemPR) {
          data.itemPR = JSON.parse(data.itemPR)
        }
        if (data.fileManage) {
          data.fileManage = JSON.parse(data.fileManage)
        }
        if (data.DeliveryDate) {
          if (data.DeliveryDate === 'null')
            data.DeliveryDate = null
        }
        if (data.itemImport) {
          data.itemImport = JSON.parse(data.itemImport)
        }
        const body = {
          Status: data.Status,
          PoNo: data.PoNo,
          DocDate: data.DocDate,
          ProductValue: data.ProductValue || 0,
          Currency: data.Currency,
          Buyer: data.Buyer,
          Supplier: data.Supplier,
          Details: data.Details,
          PaymentTerm: data.PaymentTerm,
          DeliveryTerm: data.DeliveryTerm,
          Remarks: data.Remarks,
          DeliveryDate: data.DeliveryDate,
          InvoiceNo: data.InvoiceNo,
          PackingListNo: data.PackingListNo,
          itemPR: data.itemPR,
          itemImport: data.itemImport,
          fileManage: data.fileManage,
          updateBy: data.updateBy,
          updatedAt: new Date()
        }

        const docs = await db.po_managements.update(body, { where: { id: id } })

        const result = await db.po_managements.findByPk(id);
        var dir = ''
        if (result) {
          dir = `${result.DocPath}`
          DocNo = `${result.DocNo}`
        }

        var oldPath = config.documents.tempfiles
        var newPath = dir
        if (!fs.existsSync(newPath)) {
          fn.createDirectory(newPath)
        }
        if (req.files) {
          for (const key in req.files) {
            fs.rename(req.files[key].path, newPath + '/' + req.files[key].originalname, function (err) {
              if (err) { console.log(err) }
              console.log(`Move file ${req.files[key].originalname} complete.`)
            })
          }
        }

        let DocPath = newPath
        if (data.fileManage) { //Update file name and path file
          for (const key in data.fileManage) {
            if (data.fileManage[key].name === 'PoFile') {
              data.PoFileName = data.fileManage[key].filename
              data.PoFile = newPath + data.fileManage[key].filename
            }
            if (data.fileManage[key].name === 'OrderAckFile') {
              data.OrderAckFileName = data.fileManage[key].filename
              data.OrderAckFile = newPath + data.fileManage[key].filename
            }
            if (data.fileManage[key].name === 'InvoiceFile') {
              data.InvoiceFileName = data.fileManage[key].filename
              data.InvoiceFile = newPath + data.fileManage[key].filename
            }
            if (data.fileManage[key].name === 'PackingListFile') {
              data.PackingListFileName = data.fileManage[key].filename
              data.PackingListFile = newPath + data.fileManage[key].filename
            }
            if (data.fileManage[key].name === 'BillOfLadingFile') {
              data.BillOfLadingFileName = data.fileManage[key].filename
              data.BillOfLadingFile = newPath + data.fileManage[key].filename
            }
            if (data.fileManage[key].name === 'AirWayBillFile') {
              data.AirWayBillFileName = data.fileManage[key].filename
              data.AirWayBillFile = newPath + data.fileManage[key].filename
            }
            if (data.fileManage[key].name === 'FreightInvoiceFile') {
              data.FreightInvoiceFileName = data.fileManage[key].filename
              data.FreightInvoiceFile = newPath + data.fileManage[key].filename
            }
            if (data.fileManage[key].name === 'DeliveryNoticeFile') {
              data.DeliveryNoticeFileName = data.fileManage[key].filename
              data.DeliveryNoticeFile = newPath + data.fileManage[key].filename
            }
            if (data.fileManage[key].name === 'TaxInvoiceFile') {
              data.TaxInvoiceFileName = data.fileManage[key].filename
              data.TaxInvoiceFile = newPath + data.fileManage[key].filename
            }
          }
        }
        const docfile = {
          PoFileName: data.PoFileName,
          PoFile: data.PoFile,
          OrderAckFileName: data.OrderAckFileName,
          OrderAckFile: data.OrderAckFile,
          InvoiceFileName: data.InvoiceFileName,
          InvoiceFile: data.InvoiceFile,
          PackingListFileName: data.PackingListFileName,
          PackingListFile: data.PackingListFile,
          BillOfLadingFileName: data.BillOfLadingFileName,
          BillOfLadingFile: data.BillOfLadingFile,
          AirWayBillFileName: data.AirWayBillFileName,
          AirWayBillFile: data.AirWayBillFile,
          FreightInvoiceFileName: data.FreightInvoiceFileName,
          FreightInvoiceFile: data.FreightInvoiceFile,
          DeliveryNoticeFileName: data.DeliveryNoticeFileName,
          DeliveryNoticeFile: data.DeliveryNoticeFile,
          TaxInvoiceFileName: data.TaxInvoiceFileName,
          TaxInvoiceFile: data.TaxInvoiceFile,
        }
        await db.po_managements.update(docfile, { where: { id: id } }) //update DocFile.
        //Event Log
        if (data.itemEventLog) {
          data.itemEventLog = JSON.parse(data.itemEventLog)
          const itemEventLog = []
          for (var key in data.itemEventLog) {
            itemEventLog.push({
              doc_no: DocNo,
              itemNo: data.itemEventLog[key].itemNo,
              status: data.itemEventLog[key].status,
              details: data.itemEventLog[key].details,
              event_date: data.itemEventLog[key].event_date,
              record_date: new Date(),
              remark: data.itemEventLog[key].remark,
              status: data.itemEventLog[key].status,
              update_by:data.updateBy
            })
          }
          //delete itemEvent log before
          await db.event_log.destroy({ where: { doc_no:DocNo } })
          const event_log = await db.sequelize.transaction((t) => {
            return db.event_log.bulkCreate(itemEventLog, { transaction: t })
          })
        }
        return res.status(200).json({ success: true, message: 'po_managements Update Successfully', docs })
      } catch (e) {
        return res.json({ success: false, message: 'Cannot store data to database.' })
      }
    }
    return res.status(400).json({ success: false, message: 'Bad request.' })
  },
  destroy: async (req, res) => {
    const id = req.params.id
    if (id) {
      try {
        const result = await db.po_managements.findByPk(id);
        var dir = ''
        if (result)
          dir = `${result.DocPath}`
        const doc = await db.po_managements.destroy({ where: { id } })
        try { if (doc) { fs.rmdirSync(dir, { recursive: true }) } } catch (err) { if (!err) console.log('delete images file ' + imagePath) }
        return res.send({ success: true, message: 'Delete po_managements Successfully' });
      } catch (e) {
        return res.json({ success: false, message: 'Cannot remove data from database.' })
      }
    } else {
      return res.status(400).json({ success: false, message: 'Bad request.' })
    }
  },
  destroyItems: async (req, res) => {
    const data = req.body
    if (data) {
      try {
        const itemId = []
        data.forEach(element => { itemId.push(element.id) });
        //console.log(itemId.join())
        const result = await db.po_managements.findAll({ where: { id: { [Op.in]: itemId } } });
        const dir = []
        if (result) {
          for (const key in result) {
            dir.push(result[key].DocPath)
          }
        }
        const doc = await db.po_managements.destroy({ where: { id: { [Op.in]: itemId } } })
        try {
          if (doc) {
            for (const path of dir) {
              fs.rmdirSync(path, { recursive: true })
            }
          }
        } catch (err) {
          if (!err) console.log('delete images file ' + imagePath)
        }
        return res.send({ success: true, message: 'Delete po_managements Successfully' });
      } catch (e) {
        return res.json({ success: false, message: 'Cannot remove data from database.' })
      }
    } else {
      return res.status(400).json({ success: false, message: 'Bad request.' })
    }
  }
}