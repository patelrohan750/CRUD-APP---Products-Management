const loginid=require('../db/emailAndPassword')
const jwt = require('jsonwebtoken');


module.exports.requireLogin=(req,res,next)=>{
    
 
  
    console.log(" middleware call");
    let token=localStorage.getItem('token');
    // jwt.verify(token,"iamdevelopertoken")
    // console.log(jwt.verify(token,"iamdevelopertoken"));
    if(!token){
         res.redirect('/login')
    }else{
        console.log("user Logged In");
        next();
    }
   

}