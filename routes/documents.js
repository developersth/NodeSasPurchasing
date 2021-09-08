const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra')
const documentController = require('../controllers/documents');
const env = process.env.NODE_ENV || 'development';
//const config = require('../config/config.json')
const config = require(__dirname + '/../config/config.json')[env];
const fn = require('../plugins/utils');
fn.createDirectory(config.documents.tempfiles)//create directory
fn.createDirectory(config.documents.dir)//create directory
//multer({ dest: config.documents.tempfiles}); //create directory
//multer({ dest: config.documents.dir}); //create directory
const tempDir = config.documents.tempfiles
fsExtra.emptyDirSync(tempDir) //deleted all file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir);
    },

    filename: function (req, file, cb) {
        //cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        //cb(null,file.originalname.split('.')[file.originalname.split('.').length-1])
        cb(null, file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'application/pdf' ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({ storage: storage, limits: { fieldSize: 1024 * 1024 * 10 }, fileFilter: fileFilter });
router.get('/', documentController.index)
router.get('/:id', documentController.findById)
router.get('/get/getpono', documentController.findPoNo)
router.get('/pono/:pono', documentController.findDataByPoNo)
router.post('/', upload.array('files'), documentController.store)
router.put('/:id', upload.array('files'),documentController.update)
router.delete('/:id', documentController.destroy)
router.delete('/delete/item', documentController.destroyItems)
router.delete('/', documentController.destroyItems)
module.exports = router;