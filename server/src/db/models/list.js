const mongoose = require("mongoose");

const ListItems = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    required: true
  },
  complete: {
    type: Boolean,
    required: true
  }
});

const List = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  userId: {
    type: String,
    required: true
  },
  items: [ListItems]
});

module.exports = mongoose.model("List", List);
