const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";

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

  // This will be implemented when sign-on functionality is added
  /*
  describe("GET /users/:id", () => {
    beforeEach(done => {
      this.user;

      const newUser = new User({
        email: "user@test.com",
        name: "Test User",
        password: "12345678"
      });

      newUser
        .save()
        .then(user => {
          this.user = user;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    it("should return the user data for the given ID", done => {
      request
        .get(`${base}/${this.user._id}`, (err, res, body) => {
          expect(res.name).toBe("Test User");
          expect(res.email).toBe("user@test.com");
          expect(res.status).toBe(200);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  }); */
});
