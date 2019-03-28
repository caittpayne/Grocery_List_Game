const request = require("request");
const base = "http://localhost:3003/lists/";
const server = require("../../src/server");

const List = require("../../src/db/models/list");
const User = require("../../src/db/models/user");
const mongoose = require("mongoose");
const database = "mongodb://localhost:27017/grocery_game_test";

mongoose.connect(database);

describe("routes : lists", () => {
  beforeEach(done => {
    mongoose.connect(database, () => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });
  });
  describe("Non-Authenticated Users", () => {
    describe("GET /lists", () => {
      beforeEach(done => {
        this.list;
        this.user;

        const newUser = new User({
          email: "test@grocery.com",
          name: "Test List",
          password: "12345678"
        });

        newUser
          .save()
          .then(user => {
            this.user = user;

            const newList = new List({
              name: "Get Test",
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
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
      it("should not return all lists associated and status code 401", done => {
        const options = {
          url: base,
          headers: {
            "x-auth": ""
          }
        };

        request.get(options, (err, res) => {
          expect(res.statusCode).toBe(401);
          done();
        });
      });
    });
    describe("POST /lists/create", () => {
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
      it("should not create a new list object with valid values", done => {
        const options = {
          url: `${base}create`,
          headers: {
            "x-auth": ""
          },
          form: {
            name: "Christmas Shopping",
            complete: false,
            userId: `${this.user._id}`
          }
        };
        request.post(options, (err, res, body) => {
          List.findOne({ name: "Christmas Shopping" })
            .then(list => {
              expect(list).toBeNull();
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      });
    });
    describe("PUT /lists/:listId/update", () => {
      beforeEach(done => {
        this.list;

        const newList = new List({
          name: "Update List Test",
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
      it("should not update the list object with the given values", done => {
        const options = {
          url: `${base}/${this.list._id}/update`,
          headers: {
            "x-auth": ""
          },
          form: { name: "Holiday Shopping", complete: false }
        };
        request.put(options, (err, res, body) => {
          List.findOne({ _id: this.list._id })
            .then(list => {
              expect(list.name).toBe("Update List Test");
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      });
    });
    describe("DELETE /lists/:listId/delete", () => {
      beforeEach(done => {
        this.list;

        const newList = new List({
          name: "Delete List Test",
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
      it("should not delete the list with the specified values and return status code 401", done => {
        List.find()
          .then(results => {
            const count = results.length;

            const options = {
              url: `${base}/${this.list._id}/delete`,
              headers: {
                "x-auth": ""
              }
            };

            request.delete(options, (err, res, body) => {
              List.find()
                .then(results => {
                  expect(res.statusCode).toBe(401);
                  expect(results.length).toBe(count);
                  done();
                })
                .catch(err => {
                  console.log(err);
                  done();
                });
            });
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
  describe("Authenticated Users", () => {
    beforeEach(done => {
      this.user;
      this.token;

      const newUser = new User({
        email: "authenticated@test.com",
        name: "Authenticated Test",
        password: "12345678"
      });

      newUser
        .save()
        .then(user => {
          this.user = user;

          const options = {
            url: "http://localhost:3003/users/signIn",
            form: {
              email: this.user.email,
              password: "12345678"
            }
          };

          request.post(options, (err, res, body) => {
            this.token = res.headers["x-auth"];

            done();
          });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    describe("GET /lists", () => {
      beforeEach(done => {
        const newList = new List({
          name: "Get Test",
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
      it("should return all lists associated with a user and status code 200", done => {
        const options = {
          url: base,
          user: this.user,
          headers: {
            "x-auth": this.token
          }
        };

        request.get(options, (err, res) => {
          expect(err).toBeNull();
          expect(res.statusCode).toBe(200);
          expect(res.body).toContain("Get Test");
          done();
        });
      });
    });
    describe("POST /lists/create", () => {
      it("should create a new list object with valid values and return success status code", done => {
        const options = {
          url: `${base}create`,
          user: this.user,
          headers: {
            "x-auth": this.token
          },
          form: {
            name: "Christmas Shopping",
            complete: false,
            userId: `${this.user._id}`
          }
        };
        request.post(options, (err, res, body) => {
          List.findOne({ name: "Christmas Shopping" })
            .then(list => {
              expect(list).not.toBeNull();
              expect(list.name).toBe("Christmas Shopping");
              expect(list.userId).toBe(`${this.user._id}`);
              expect(res.statusCode).toBe(200);
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      });
      it("should not create a new list object with missing attributes and return 400 status code", done => {
        const options = {
          url: `${base}create`,
          user: this.user,
          headers: {
            "x-auth": this.token
          },
          form: {
            name: "Christmas Shopping"
          }
        };
        request.post(options, (err, res, body) => {
          List.findOne({ name: "Christmas Shopping" })
            .then(list => {
              expect(list).toBeNull();
              expect(res.statusCode).toBe(400);
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      });
      it("should not create a new list object with invalid attributes and return 400 status code", done => {
        const options = {
          url: `${base}create`,
          user: this.user,
          headers: {
            "x-auth": this.token
          },
          form: {
            name: "",
            complete: false,
            userId: this.user._id
          }
        };
        request.post(options, (err, res, body) => {
          List.findOne({ name: "Christmas Shopping" })
            .then(list => {
              expect(list).toBeNull();
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
    describe("PUT /lists/:listId/update", () => {
      beforeEach(done => {
        this.list;

        const newList = new List({
          name: "Update List Test",
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
      it("should update the list object with the given values and return a status code of 200", done => {
        const options = {
          url: `${base}/${this.list._id}/update`,
          user: this.user,
          headers: {
            "x-auth": this.token
          },
          form: { name: "Holiday Shopping", complete: false }
        };
        request.put(options, (err, res, body) => {
          List.findOne({ _id: this.list._id })
            .then(list => {
              expect(list.name).toBe("Holiday Shopping");
              expect(res.statusCode).toBe(200);
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      });
      it("should not update the list object with invalid or missing values", done => {
        const options = {
          url: `${base}/${this.list._id}/update`,
          user: this.user,
          headers: {
            "x-auth": this.token
          },
          form: { name: "", complete: false }
        };
        request.put(options, (err, res, body) => {
          List.findOne({ _id: this.list._id })
            .then(list => {
              done();
            })
            .catch(err => {
              expect(err).not.toBeNull();
              done();
            });
        });
      });
    });
    describe("DELETE /lists/:listId/delete", () => {
      beforeEach(done => {
        this.list;

        const newList = new List({
          name: "Delete List Test",
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
      it("should delete the list with the specified values", done => {
        List.find()
          .then(results => {
            const count = results.length;

            const options = {
              url: `${base}/${this.list._id}/delete`,
              user: this.user,
              headers: {
                "x-auth": this.token
              }
            };

            request.delete(options, (err, res, body) => {
              List.find()
                .then(results => {
                  expect(err).toBeNull();
                  expect(results.length).toBe(count - 1);
                  done();
                })
                .catch(err => {
                  console.log(err);
                  done();
                });
            });
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
});
