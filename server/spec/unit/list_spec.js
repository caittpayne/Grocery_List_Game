const List = require("../../src/db/models/list");
const User = require("../../src/db/models/user");
const mongoose = require("mongoose");
const database = "mongodb://localhost:27017/grocery_game_test";

mongoose.connect(database);

describe("List", () => {
  beforeEach(done => {
    mongoose.connect(database, () => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });
  });
  describe("get", () => {
    beforeEach(done => {
      const newUser = new User({
        email: "test@grocery.com",
        name: "Test List",
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
    it("should return all lists objects associated with a user account", done => {
      const newList = new List({
        name: "Get Lists Test",
        complete: false,
        userId: this.user._id
      });

      newList
        .save()
        .then(list => {
          List.find({ userId: this.user._id })
            .then(lists => {
              expect(lists.length).toBe(1);
              expect(lists[0].name).toBe("Get Lists Test");
              expect(list[0].complete).toBe(false);
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
  describe("create", () => {
    beforeEach(done => {
      const newUser = new User({
        email: "test@grocery.com",
        name: "Test List",
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
    describe("create a list", () => {
      it("should not create a new List object with an invalid name", done => {
        const newList = new List({
          name: "",
          complete: false,
          userId: this.user._id
        });

        newList
          .save()
          .then(() => {
            done();
          })
          .catch(err => {
            expect(err).not.toBeNull();
            done();
          });
      });
      it("should not create a new List object with an invalid userId", done => {
        const newList = new List({
          name: "Invalid Name Test",
          userId: ""
        });

        newList
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
    it("should create a new List object with a valid name", done => {
      const newList = new List({
        name: "Create List",
        complete: false,
        userId: this.user._id
      });

      newList
        .save()
        .then(list => {
          expect(list.name).toBe("Create List");
          expect(list.complete).toBe(false);
          expect(list.userId).toBe(`${this.user._id}`);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
  describe("update", () => {
    beforeEach(done => {
      this.list;

      const newList = new List({
        name: "Update Test",
        complete: false,
        userId: this.user._id
      });

      newList
        .save()
        .then(list => {
          this.list = list;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    it("should update the list object with the provided value", done => {
      List.findByIdAndUpdate(
        this.list._id,
        { name: "Christmas Dinner" },
        { new: true }
      )
        .then(list => {
          expect(list.name).toBe("Christmas Dinner");
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
  describe("delete", () => {
    beforeEach(done => {
      this.list;

      const newList = new List({
        name: "Delete Test",
        complete: false,
        userId: this.user._id
      });

      newList
        .save()
        .then(list => {
          this.list = list;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    it("should delete a list object with the specified criteria", done => {
      List.findByIdAndDelete(this.list._id)
        .then(() => {
          List.findById(this.list._id)
            .then(list => {
              expect(list).toBeNull();
              done();
            })
            .catch(err => {
              console.log(err);
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
