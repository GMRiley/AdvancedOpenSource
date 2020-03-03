var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let User = require('./db/models/User');
require('./db/mongoose/mongoose')

var indexRouter = require('./routes/index');
var viewRouter = require('./routes/view');
var updateRouter = require('./routes/update');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.post('/view', (req, res)=>{
  let user = new User(req.body)
  user.save().then(()=>{
    res.redirect('/view')
  }).catch((e)=>{
    res.status(400).send(e);
  })
});
app.delete('/delete', (req, res) =>{
  let user = new User()

  user.findByIdAndRemove({_id : req.params.id}, (err,doc) =>{
    res.redirect('/view')
  })
  
})
app.use('/view', viewRouter);
app.use('/update', updateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
