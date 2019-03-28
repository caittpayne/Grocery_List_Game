const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3003/users/";

const User = require("../../src/db/models/user");
const mongoose = require("mongoose");
const database = "mongodb://localhost:27017/grocery_game_test";

mongoose.connect(database);

describe("routes : users", () => {
  beforeEach(done => {
    mongoose.connect(database, () => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });
  });
  describe("POST /create", () => {
    it("should create a new user with valid values and return success status code", done => {
      const newUser = {
        url: `${base}create`,
        form: {
          email: "user@test.com",
          password: "12345678",
          name: "Test User"
        }
      };
      request.post(newUser, (err, res, body) => {
        User.findOne({ email: "user@test.com" })
          .then(user => {
            expect(user).not.toBeNull();
            expect(user.email).toBe("user@test.com");
            expect(user.name).toBe("Test User");
            expect(res.statusCode).toBe(200);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
    it("should not create a new user with missing attributes and return 400 status code", done => {
      const newUser = {
        url: `${base}create`,
        form: {
          email: "user@test.com",
          password: "12345678"
        }
      };
      request.post(newUser, (err, res, body) => {
        User.findOne({ email: "user" })
          .then(user => {
            expect(user).toBeNull();
            expect(res.statusCode).toBe(400);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
    it("should not create a new user with invalid attributes and return 400 status code", done => {
      const newUser = {
        url: `${base}create`,
        form: {
          email: "user",
          password: "12345678",
          name: "Test User"
        }
      };
      request.post(newUser, (err, res, body) => {
        User.findOne({ email: "user" })
          .then(user => {
            expect(user).toBeNull();
            expect(res.statusCode).toBe(400);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
  describe("POST /signIn", () => {
    it("should sign in user with valid credentials and return JWT", done => {
      const newUser = new User({
        email: "user1@test.com",
        name: "Test",
        password: "12345678"
      });

      newUser
        .save()
        .then(user => {
          this.user = user;

          const login = {
            url: `${base}signIn`,
            form: {
              email: this.user.email,
              password: "12345678"
            }
          };

          request.post(login, (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(res.headers["x-auth"]).not.toBeNull();
            done();
          });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    it("should not sign in user with invalid credentials and return a status code 401", done => {
      const newUser = new User({
        email: "user2@test.com",
        name: "Test",
        password: "12345678"
      });

      newUser
        .save()
        .then(user => {
          this.user = user;

          const login = {
            url: `${base}signIn`,
            form: {
              email: this.user.email,
              password: "12345"
            }
          };

          request.post(login, (err, res, body) => {
            expect(res.statusCode).toBe(401);

            done();
          });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
});
