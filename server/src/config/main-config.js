require("dotenv").config();
const bodyParser = require("body-parser");
const logger = require("morgan");

module.exports = {
  init(app, express) {
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  }
};
