const db = require('../models');
const fn = require('../plugins/utils');
var fs = require('fs');
var dateFormat = require("dateformat");
var now = new Date();
const env = process.env.NODE_ENV || 'development';
//const config = require('../config/config.json')
const config = require(__dirname + '/../config/config.json')[env];
const { Op } = require("sequelize");
module.exports = {
  index: async (req, res) => {
    try {
      const docs = await db.Documents.findAll({ order: [['id', 'DESC']] })
      const result = docs.map((doc) => {
        if (doc.PoFile)
          doc.PoFile = config.baseURL + doc.PoFile
        if (doc.OrderAckFile)
          doc.OrderAckFile = config.baseURL + doc.OrderAckFile
        if (doc.InvoiceFile)
          doc.InvoiceFile = config.baseURL + doc.InvoiceFile
        if (doc.PackingListFile)
          doc.PackingListFile = config.baseURL + doc.PackingListFile
        if (doc.BillOfLadingFile)
          doc.BillOfLadingFile = config.baseURL + doc.BillOfLadingFile
        if (doc.AirWayBillFile)
          doc.AirWayBillFile = config.baseURL + doc.AirWayBillFile
        if (doc.TaxInvoiceFile)
          doc.TaxInvoiceFile = config.baseURL + doc.TaxInvoiceFile
        if (doc.DeliveryNoticeFile)
          doc.DeliveryNoticeFile = config.baseURL + doc.DeliveryNoticeFile
        if (doc.FreightInvoiceFile)
          doc.FreightInvoiceFile = config.baseURL + doc.FreightInvoiceFile
        if (doc.itemPR) {
          doc.itemPR = JSON.parse(doc.itemPR)
          for (const key in doc.itemPR) {
            if (doc.itemPR[key].PRFileName) {
              doc.itemPR[key].PRFile = config.baseURL + doc.DocPath + doc.itemPR[key].PRFileName
            }
          }
        }
        return {
          id: doc.id,
          DocNo: doc.DocNo,
          DocDate: doc.DocDate,
          Status: doc.Status,
          PoNo: doc.PoNo,
          PoFileName: doc.PoFileName,
          PoFile: doc.PoFile,
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
          DeliveryDate: doc.DeliveryDate,
          InvoiceNo: doc.InvoiceNo,
          InvoiceFileName: doc.InvoiceFileName,
          InvoiceFile: doc.InvoiceFile,
          PackingListNo: doc.PackingListNo,
          PackingListFileName: doc.PackingListFileName,
          PackingListFile: doc.PackingListFile,
          FreightForworder: doc.FreightForworder,
          BillOfLadingNo: doc.BillOfLadingNo,
          BillOfLadingFileName: doc.BillOfLadingFileName,
          BillOfLadingFile: doc.BillOfLadingFile,
          AirWayBillNo: doc.AirWayBillNo,
          AirWayBillFileName: doc.AirWayBillFileName,
          AirWayBillFile: doc.AirWayBillFile,
          TaxInvoiceNo: doc.TaxInvoiceNo,
          TaxInvoiceFileName: doc.TaxInvoiceFileName,
          TaxInvoiceFile: doc.TaxInvoiceFile,
          TaxValue: doc.TaxValue,
          FreightInvoiceNo: doc.FreightInvoiceNo,
          FreightInvoiceFileName: doc.FreightInvoiceFileName,
          FreightInvoiceFile: doc.FreightInvoiceFile,
          FreightInvoiceValue: doc.FreightInvoiceValue,
          DeliveryNoticeFile: doc.DeliveryNoticeFile,
          createBy: doc.createBy,
          updateBy: doc.updateBy,
          DocPath: doc.DocPath,
          fileManage: JSON.parse(doc.fileManage),
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        }
      })
      return res.json(result)
    } catch (e) {
      return res.status(500).json({ message: 'Cannot get data from database.' })
    }
  },
  findById: async (req, res) => {
    try {
      const id = req.params.id
      const doc = await db.Documents.findByPk(id)
      if (doc) {
        if (doc.PoFile)
          doc.PoFile = config.baseURL + doc.PoFile
        if (doc.OrderAckFile)
          doc.OrderAckFile = config.baseURL + doc.OrderAckFile
        if (doc.InvoiceFile)
          doc.InvoiceFile = config.baseURL + doc.InvoiceFile
        if (doc.PackingListFile)
          doc.PackingListFile = config.baseURL + doc.PackingListFile
        if (doc.BillOfLadingFile)
          doc.BillOfLadingFile = config.baseURL + doc.BillOfLadingFile
        if (doc.AirWayBillFile)
          doc.AirWayBillFile = config.baseURL + doc.AirWayBillFile
        if (doc.TaxInvoiceFile)
          doc.TaxInvoiceFile = config.baseURL + doc.TaxInvoiceFile
        if (doc.DeliveryNoticeFile)
          doc.DeliveryNoticeFile = config.baseURL + doc.DeliveryNoticeFile
        if (doc.FreightInvoiceFile)
          doc.FreightInvoiceFile = config.baseURL + doc.FreightInvoiceFile
        if (doc.itemPR) {
          doc.itemPR = JSON.parse(doc.itemPR)
          for (const key in doc.itemPR) {
            if (doc.itemPR[key].PRFileName) {
              doc.itemPR[key].PRFile = config.baseURL + doc.DocPath + doc.itemPR[key].PRFileName
            }
          }
        }

        const result = {
          id: doc.id,
          DocNo: doc.DocNo,
          DocDate: doc.DocDate,
          Status: doc.Status,
          PoNo: doc.PoNo,
          PoFileName: doc.PoFileName,
          PoFile: doc.PoFile,
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
          DeliveryDate: doc.DeliveryDate,
          InvoiceNo: doc.InvoiceNo,
          InvoiceFileName: doc.InvoiceFileName,
          InvoiceFile: doc.InvoiceFile,
          PackingListNo: doc.PackingListNo,
          PackingListFileName: doc.PackingListFileName,
          PackingListFile: doc.PackingListFile,
          FreightForworder: doc.FreightForworder,
          BillOfLadingNo: doc.BillOfLadingNo,
          BillOfLadingFileName: doc.BillOfLadingFileName,
          BillOfLadingFile: doc.BillOfLadingFile,
          AirWayBillNo: doc.AirWayBillNo,
          AirWayBillFileName: doc.AirWayBillFileName,
          AirWayBillFile: doc.AirWayBillFile,
          TaxInvoiceNo: doc.TaxInvoiceNo,
          TaxInvoiceFileName: doc.TaxInvoiceFileName,
          TaxInvoiceFile: doc.TaxInvoiceFile,
          TaxValue: doc.TaxValue,
          FreightInvoiceNo: doc.FreightInvoiceNo,
          FreightInvoiceFileName: doc.FreightInvoiceFileName,
          FreightInvoiceFile: doc.FreightInvoiceFile,
          FreightInvoiceValue: doc.FreightInvoiceValue,
          DeliveryNoticeFile: doc.DeliveryNoticeFile,
          createBy: doc.createBy,
          updateBy: doc.updateBy,
          DocPath: doc.DocPath,
          fileManage: JSON.parse(doc.fileManage),
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
      const result = await db.Documents.findAll({ attributes: ['PoNo', 'Supplier'], where: { [Op.or]: [{ Supplier: payname }, { FreightForworder: payname }] }, order: [['createdAt', 'DESC']] })
      return res.json(result)
    } catch (e) {
      return res.status(500).json({ message: 'Cannot get data from database.' })
    }
  },
  findDataByPoNo: async (req, res) => {
    try {
      const pono = req.params.pono
      const result = await db.Documents.findOne({ where: { PoNo: pono } })
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
          FreightForworder: data.FreightForworder,
          BillOfLadingNo: data.BillOfLadingNo,
          AirWayBillNo: data.AirWayBillNo,
          TaxInvoiceNo: data.TaxInvoiceNo,
          TaxValue: data.TaxValue || 0,
          FreightInvoiceNo: data.FreightInvoiceNo,
          FreightInvoiceValue: data.FreightInvoiceValue || 0,
          itemPR: data.itemPR,
          fileManage: data.fileManage
        }
        console.log(body)
        const docs = await db.sequelize.transaction((t) => {
          return db.Documents.create(body, { transaction: t }).then(result => id = result.id)
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
          DocNo: DocNo,
          DocPath: DocPath,
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
        await db.Documents.update(docfile, { where: { id: id } }) //update DocNo.
        return res.status(201).json({ success: true, message: 'Documents Created Successfully', docs })
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
          FreightForworder: data.FreightForworder,
          BillOfLadingNo: data.BillOfLadingNo,
          AirWayBillNo: data.AirWayBillNo,
          TaxInvoiceNo: data.TaxInvoiceNo,
          TaxValue: data.TaxValue || 0,
          FreightInvoiceNo: data.FreightInvoiceNo,
          FreightInvoiceValue: data.FreightInvoiceValue || 0,
          itemPR: data.itemPR,
          fileManage: data.fileManage,
          updateBy: data.updateBy,
          updatedAt: new Date()
        }

        const docs = await db.Documents.update(body, { where: { id: id } })

        const result = await db.Documents.findByPk(id);
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
        await db.Documents.update(docfile, { where: { id: id } }) //update DocFile.
        return res.status(200).json({ success: true, message: 'Documents Update Successfully', docs })
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
        const result = await db.Documents.findByPk(id);
        var dir = ''
        if (result)
          dir = `${result.DocPath}`
        const doc = await db.Documents.destroy({ where: { id } })
        try { if (doc) { fs.rmdirSync(dir, { recursive: true }) } } catch (err) { if (!err) console.log('delete images file ' + imagePath) }
        return res.send({ success: true, message: 'Delete Documents Successfully' });
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
        const result = await db.Documents.findAll({ where: { id: { [Op.in]: itemId } } });
        const dir = []
        if (result) {
          for (const key in result) {
            dir.push(result[key].DocPath)
          }
        }
        const doc = await db.Documents.destroy({ where: { id: { [Op.in]: itemId } } })
        try {
          if (doc) {
            for (const path of dir) {
              fs.rmdirSync(path, { recursive: true })
            }
          }
        } catch (err) {
          if (!err) console.log('delete images file ' + imagePath)
        }
        return res.send({ success: true, message: 'Delete Documents Successfully' });
      } catch (e) {
        return res.json({ success: false, message: 'Cannot remove data from database.' })
      }
    } else {
      return res.status(400).json({ success: false, message: 'Bad request.' })
    }
  }
}