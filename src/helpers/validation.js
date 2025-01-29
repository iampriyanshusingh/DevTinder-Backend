const validator = require('validator');

const validation = (req) => {
   const {firstName, lastName, email, password  } =  req.body;

   if(!firstName || !lastName){
    throw new Error("Name is not Valid");
   } else if(!validator.isEmail(email)){
    throw new Error("Email is not Valid");
   }else if(!validator.isStrongPassword(password)){
    throw new Error("Please Enter Strong Password");
   }
} 

module.exports= {
    validation,
}