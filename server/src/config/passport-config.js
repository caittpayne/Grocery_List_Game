const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../src/db/models/user");
const authHelper = require("../auth/helpers");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = {
  init(app) {
    app.use(passport.initialize());

    passport.use(
      new LocalStrategy(
        {
          usernameField: "email"
        },
        (email, password, done) => {
          User.findOne({ email: email })
            .then(user => {
              if (
                !user ||
                !authHelper.comparePassword(password, user.password)
              ) {
                return done(null, false, {
                  message: "Invalid email or password"
                });
              }
              return done(null, user, { message: "Sign in successful" });
            })
            .catch(err => {
              done(err);
            });
        }
      )
    );

    passport.use(
      new JWTStrategy(
        {
          jwtFromRequest: ExtractJWT.fromHeader('x-auth'),
          secretOrKey: process.env.JWT_SECRET
        },
        function(jwtPayload, done) {
          User.findById(jwtPayload._id)
            .then(user => {
              return done(null, user);
            })
            .catch(err => {
              return done(err);
            });
        }
      )
    );
  }
};
