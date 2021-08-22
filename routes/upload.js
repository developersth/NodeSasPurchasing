const express = require('express');
var app = express();
const router = express.Router();
var multer  = require('multer');
var upload = multer();
var fs = require('fs');
var type = upload.single('file');
/* GET home page. */

app.get('/', function(req, res, next) {
    res.render('upload', { title: 'Upload' });
  });
router.post('/',type, function (req,res) {

  /** When using the "single"
      data come in "req.file" regardless of the attribute "name". **/
  var tmp_path = req.file.path;

  /** The original name of the uploaded file
      stored in the variable "originalname". **/
  var target_path = 'uploads/' + req.file.originalname;

  /** A better way to copy the uploaded file. **/
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function() { res.render('complete'); });
  src.on('error', function(err) { res.render('error'); });
  return res.json({status:true,message:'Success'})

});
module.exports = router;
