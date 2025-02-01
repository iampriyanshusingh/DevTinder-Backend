const validator = require("validator");
const bcrypt = require("bcrypt");

const validation = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not Valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not Valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter Strong Password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "email",
    "Gender",
    "age",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

const validatePasswordByUser = async (req) => {
  const oldPassword = req.body;
  const currentPassword = req.user.password;

  const checkPassword = await bcrypt.compare(oldPassword, currentPassword);

  return checkPassword;
};

module.exports = {
  validation,
  validateEditProfileData,
  validatePasswordByUser,
};
