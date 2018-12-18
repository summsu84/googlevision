var express = require('express');
var exphbs = require('express-handlebars');       //Handlebars template engine for Express
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Routing files
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/public/view'));
//app.set('view engine', 'jade');
//Handlebars template engine
var hbs = exphbs.create({
  partialsDir : __dirname + '/public/view/partials',
  defaultLayout : __dirname + '/public/view/layouts/default.hbs',
  layoutDir : __dirname + '/public/view/layouts'
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
//Enable view cache
app.enable('view cache');


//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
var port = process.env.PORT || 3000;

app.listen(port, function () {
  process.env['GOOGLE_APPLICATION_CREDENTIALS'] = __dirname + '/MyVisionDemo.json';
  console.log(">>GOGLE CREDENTIAL : " + process.env['GOOGLE_APPLICATION_CREDENTIALS']);
  console.log('express-handlebars example server listening on: ' + port);
});

module.exports = app;
