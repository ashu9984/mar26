// Requiring all the modules that will be used in the simple server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
const path = require('path')

var config = require('./config')
var registrationLogin = require('./router/registrationLogin')
var product = require('./router/product')
var profile = require('./router/profile')
var jwtVerify = require('./router/jwtVerify')


var busboyBodyParser = require('busboy-body-parser');


var port = process.env.PORT || 4200; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(busboyBodyParser());

// use morgan to log requests to the console
app.use(morgan('dev'));

  
  app.use(express.static(path.join('dist')))
  
app.use('/',registrationLogin)
app.use('/product',product)
app.use('/profile',profile)

app.listen(port, () => console.log(`Listening on ${ port }`))


