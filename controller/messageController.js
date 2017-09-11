var Message = require('../model/homework7');
const crypto=require('./cryption');
const RX=require('@reactivex/rxjs');
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

  Message.find({},function(err,data){
   var decryptData=[];
   for(let i=0;i<data.length;i++)
   {
     decryptData.push(crypto.decrypt(data[i].message).toString());

   }
 console.log(decryptData);
  
  res.render('./decriptedMessages.ejs',{messages:decryptData});

  });
},

getEncryptedMessages:function(req,res){

  Message.find({},function(err,data){
  res.render('./encryptedMessages.ejs',{encryptedMessages:data});

  });
}



}//ends module.exports