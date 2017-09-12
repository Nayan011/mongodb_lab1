var Message = require('../model/homework7');
const crypto=require('./cryption');
const RX=require('@reactivex/rxjs');
const {promisify}=require('util');
module.exports={

createMessage:function(req,res){
  let cryptedMsg=crypto.encrypt(req.body.message);
  var msg=new Message({message:cryptedMsg});

   msg.save(function(err,data){
    let cryptedMsg=crypto.encrypt(data.message);
    console.log(cryptedMsg);

    res.redirect('/messages');
   });

  },

getDecryptedMessages:function(req,res){

  RX.Observable.from(Message.find({})).map(obj=>crypto.decrypt(obj.message))
  .subscribe(function(decryptData){

    res.render('./decriptedMessages.ejs',{messages:decryptData});
  });

  
},

getEncryptedMessages:function(req,res){


 promisify(Message.find({})).then(function(data){
 res.render('./encryptedMessages.ejs',{encryptedMessages:data});

 });


}



}//ends module.exports
