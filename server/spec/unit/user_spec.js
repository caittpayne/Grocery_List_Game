const User = require("../../src/db/models/user");
const mongoose = require("mongoose");
const database = "mongodb://localhost:27017/grocery_game_test";

mongoose.connect(database);

describe("User", () => {
  beforeEach(done => {
    mongoose.connect(database, () => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });
  });

  describe("create", () => {
    it("should create a new User object with a valid email, name, and password", done => {
      const newUser = new User({
        email: "test@grocery.com",
        name: "Test User",
        password: "12345678"
      });

      newUser
        .save()
        .then(user => {
          expect(user.email).toBe("test@grocery.com");
          expect(user.name).toBe("Test User");
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it("should not create a new User object with an invalid email", done => {
      const newUser = new User({
        email: "test",
        name: "Invalid Email Test",
        password: "12345678"
      });

      newUser
        .save()
        .then(() => {
          done();
        })
        .catch(err => {
          expect(err).not.toBeNull();
          done();
        });
    });
    it("should not create a new User object with an invalid name", done => {
      const newUser = new User({
        email: "testname@grocery.com",
        name: "",
        password: "12345678"
      });

      newUser
        .save()
        .then(() => {
          done();
        })
        .catch(err => {
          expect(err).not.toBeNull();
          done();
        });
    });
    it("should not create a new User object with an invalid password", done => {
      const newUser = new User({
        email: "testname@grocery.com",
        name: "Test Password",
        password: "12"
      });

      newUser
        .save()
        .then(() => {
          done();
        })
        .catch(err => {
          expect(err).not.toBeNull();
          done();
        });
    });
  });
  it("should not create a user with an email already taken", done => {
    const newUser = new User({
      email: "testduplicate@grocery.com",
      name: "Test Duplicate",
      password: "12345678"
    });

    newUser
      .save()
      .then(() => {
        const dupUser = new User({
          email: "testduplicate@grocery.com",
          name: "Dupe User",
          password: "12345678"
        });

        dupUser
          .save()
          .then(user => {
            done();
          })
          .catch(err => {
            expect(err).not.toBeNull();
            done();
          });
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });
});
