var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan'); // used to see requests
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var mongoose=require('mongoose');
var config = require('./config');
app.set('strict routing',true);
 app.set('case sensitive routing',true);
 app.set('env','development');
 app.enable('trust proxy');
 app.use(cookieParser());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());
 
 app.use(express.static(__dirname + '/views'));
 

 app.set('view  engine', 'ejs'); // set up ejs for templating


 app.use(morgan('dev'));

 mongoose.connect(config.database);
 var messageController=require('./controller/messageController');
app.get('/create', function(req,res){

	res.render('./message.ejs');
});
app.get('/messages',messageController.getEncryptedMessages);
app.get('/secret',messageController.getDecryptedMessages);
app.post('/create',messageController.createMessage);

app.listen(config.port);
console.log('Magic happens on port ' + config.port);