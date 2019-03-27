const User = require("../db/models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");

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

  signIn(req, res, next) {
    passport.authenticate("local", { session: false }, function(err, user) {
      if (err || !user) {
        return res.status(401).send("Sign in failed");
      }

      req.logIn(user, { session: false }, function(err) {
        if (err) {
          return res.status(401).send({ error: err });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        return res
          .status(200)
          .send({
              user: user,
              token: token
          });
      });
    })(req, res, next);
  },

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
