const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 30,
    },
    lastName: {
      type: String,
    },
    Gender: {
      type: String,
      // required: true,
      lowerCase:true,
      validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error("Gender Not Exist");
        }
      }
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim:true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Invalid Email");
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("Password is too weak");
        }
      }
    },
    skills: [String]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
