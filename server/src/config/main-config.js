require("dotenv").config();
const bodyParser = require("body-parser");
const logger = require("morgan");
const passportConfig = require("./passport-config");
const cors = require('cors');

module.exports = {
  init(app, express) {
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    passportConfig.init(app);
  }
};
