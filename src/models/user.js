const mongoose =  require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    Gender:{
        type: String
    },
    age:{
        type: Number
    },
    email:{
        type: String
    },
    password:{
        type: String
    } 
})

module.exports = mongoose.model("User", userSchema); 