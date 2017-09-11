var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt-nodejs');

// user schema



var messageSchema = new Schema({


        message:String
        
        
 });


module.exports = mongoose.model('Message', messageSchema);
