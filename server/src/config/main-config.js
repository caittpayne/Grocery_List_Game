require("dotenv").config();
const bodyParser = require("body-parser");
const logger = require("morgan");
const passportConfig = require("./passport-config");

module.exports = {
  init(app, express) {
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    passportConfig.init(app);
  }
};
