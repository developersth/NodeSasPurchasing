const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra')
const documentController = require('../controllers/documents');
const config = require('../config/config.json')
const fn = require('../plugins/utils');
fn.createDirectory(config.documents.tempfiles)//create directory
fn.createDirectory(config.documents.dir)//create directory
//multer({ dest: config.documents.tempfiles}); //create directory
//multer({ dest: config.documents.dir}); //create directory
const tempDir =config.documents.tempfiles
fsExtra.emptyDirSync(tempDir) //deleted all file
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,tempDir);
    },
  
    filename: function(req, file, cb) {
        //cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        //cb(null,file.originalname.split('.')[file.originalname.split('.').length-1])
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage })
router.get('/', documentController.index)
router.get('/:id',documentController.findById)
router.post('/', upload.array('files'), documentController.store)
router.put('/:id', documentController.update)
router.delete('/:id', documentController.destroy)

module.exports = router;