const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log(`DB Connected: ${process.env.DB}`);
  })
  .catch(err => {
    console.log(err);
  });

module.exports = mongoose;
