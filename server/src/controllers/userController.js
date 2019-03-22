const User = require("../db/models/user");
const bcrypt = require("bcryptjs");

module.exports = {
  createUser(req, res) {
    let newUser = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    });

    newUser
      .save()
      .then(user => {
        if (!user) {
          return res.status(400).send();
        }

        return res.status(200).send(user);
      })
      .catch(err => {
        if (err) {
          return res.status(400).send({ error: err });
        }

        return res.status(400).send();
      });
  },

  // This needs to be implemented when sign on function is added

  getUser(req, res) {
    User.findOne({ _id: req._id })
      .then(user => {
        if (!user) {
          return res.status(404).send();
        }
        return res.status(200).send(user);
      })
      .catch(err => {
        console.log(err);
        return res.status(401).send(err);
      });
  }
};
