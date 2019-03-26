const bcrypt = require("bcryptjs");

module.exports = {
  comparePassword(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
  }
};
