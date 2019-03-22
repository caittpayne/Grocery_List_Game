const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const User = new mongoose.Schema({
  email: {
    type: String,
    minlength: 5,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true
  }
});

User.pre("save", function(next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      return Promise.reject(err);
    }

    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
      user.password = hashedPassword;
      next();
    });
  });
});

User.plugin(uniqueValidator);

module.exports = mongoose.model("User", User);
