var express = require('express');
var router = express.Router();
let Users = require("../models/users")


/* GET users listing. */
router.get('/admin', function(req, res, next) {
  res.send('respond with a resource');
});

// Login
router.post('/adminLogin',(req,res,next)=>{
  let loginname = req.body.loginname
  let password = req.body.password

  Users.findOne({userName:loginname},(err1,userDoc)=>{
    if(err1){
      res.json({
        status:"1",
        msg:err1.message
      })
    }else{
      if(userDoc){
        if(userDoc.userPwd==password){
          res.cookie("userId",userDoc.userId,{
            path:'/',
            maxAge:1000*60*60
          })
          res.cookie("userName",userDoc.userName,{
            path:'/',
            maxAge:1000*60*60
          })
          res.json({
            status:"0",
            msg:"success",
            result:{
              nickName:userDoc.userName
            }
          })
        }else{
          res.json({
            status:"1",
            msg:"password error"
          })
        }
      }
    }
  })


})
// Logout
router.post("/adminLogout",(req,res,next)=>{
  res.cookie("userId","",{
    path:'/',
    maxAge:-1
  })
  res.json({
    status:"0",
    msg:"",
    result:""
  })
})
// Validate login
router.get('/adminChecklogin',(req,res,next)=>{
  if(req.cookies.userId){
    res.json({
      status:"0",
      msg:"",
      result:{
        nickName:req.cookies.userName
      }
    })
  }else{
    res.json({
      status:"1",
      msg:"未登录",
      result:""
    })
  }
})

module.exports = router;
