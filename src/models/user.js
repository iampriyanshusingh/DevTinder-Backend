const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      lowerCase: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender Not Exist");
        }
      },
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
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is too weak");
        }
      },
    },
    skills: [String],
  },
  {
    timestamps: true,
  }
);

userSchema.model.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Priyanshu@123", {
    expiresIn: "1h",
  });

  return token;
};

userSchema.model.getPassword = async function () {
  const user = this;
  const password = await bcrypt.hash(user.password, 10);

  return password;
}

userSchema.model.validatePassword =  async function(){
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(password, passwordHash);

  return isPasswordValid;
}
module.exports = mongoose.model("User", userSchema);
