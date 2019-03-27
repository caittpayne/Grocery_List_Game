const mongoose = require("mongoose");

const List = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  complete: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("List", List);
