var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const passport = require('./config/passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var PoManagementRouter = require('./routes/PoManagement');
var uploadRouter = require('./routes/upload');
var supplierRouter = require('./routes/supplier');
var paymenttermRouter = require('./routes/paymentterm');
var userrolesRouter = require('./routes/userroles');
var paymentsRouter = require('./routes/payments');
var freightforworderRouter = require('./routes/freightforworder');
var authRouter = require('./routes/auth');
var buyersRouter = require('./routes/buyers');
var deliverytermsRouter = require('./routes/deliveryterms');
const bodyParser = require('body-parser');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(express.static(path.join(__dirname, "/public")));
app.use('/uploads', express.static('uploads'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
var allowlist = ['http://localhost:3000', 'https://ktd-web.firebaseapp.com', 'https://ktd-web.web.app']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate));
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
//app.use('/api/users', usersRouter);
app.use('/api/po_management', PoManagementRouter);
app.use('/upload', uploadRouter);
app.use('/api/supplier', supplierRouter);
app.use('/api/payment_term', paymenttermRouter);
app.use('/api/user_roles', userrolesRouter);
app.use('/api/payments',passport.authenticate('jwt', { session: false }), paymentsRouter);
app.use('/api/freight_forworders', freightforworderRouter);
app.use('/api/buyers',buyersRouter);
app.use('/api/delivery_terms',deliverytermsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
