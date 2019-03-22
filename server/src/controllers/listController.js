const List = require("../db/models/list");

module.exports = {
  createList(req, res) {
    let newList = new List({
      name: req.body.name,
      userId: req.body.userId
    });

    newList
      .save()
      .then(list => {
        if (!list) {
          return res.status(400).send();
        }

        return res.status(200).send(list);
      })
      .catch(err => {
        if (err) {
          return res.status(400).send({ error: err });
        }

        return res.status(400).send();
      });
  },

  createListItem(req, res) {
    let newItem = {
      name: req.body.name,
      complete: req.body.complete
    };

    List.findByIdAndUpdate(req.params.listId)
      .then(list => {
        if (!list) {
          return res.status(404).send();
        }

        list.items.push(newItem);

        list
          .save()
          .then(list => {
            return res.status(200).send(list.items);
          })
          .catch(err => {
            if (err) {
              return res.status(400).send({ error: err });
            }
            return res.status(400).send();
          });
      })
      .catch(err => {
        if (err) {
          return res.status(400).send({ error: err });
        }

        return res.status(400).send();
      });
  },

  updateList(req, res) {
    if (req.body.name.length < 2) {
      return res.status(400).send();
    }

    List.findByIdAndUpdate(
      req.params.listId,
      { name: req.body.name },
      { new: true }
    )
      .then(list => {
        if (!list) {
          return res / status(404).send();
        }

        return res.status(200).send(list);
      })
      .catch(err => {
        if (err) {
          return res.status(400).send(err);
        }

        return res.status(400).send();
      });
  },

  updateListItem(req, res) {
    if (req.body.name.length < 2) {
      return res.status(400).send();
    }

    List.findOneAndUpdate(
      { _id: req.params.listId, "items._id": req.params.itemId },
      { "items.$.name": req.body.name, "items.$.complete": req.body.complete },
      { new: true }
    )
      .then(list => {
        if (!list) {
          return res.status(404).send();
        }

        return res.status(200).send(list);
      })
      .catch(err => {
        if (err) {
          return res.status(400).send({ error: err });
        }

        return res.status(400).send();
      });
  },

  deleteList(req, res) {
    List.findByIdAndDelete(req.params.listId)
      .then(() => {
        return res.status(200).send("List has been deleted");
      })
      .catch(err => {
        if (err) {
          return res.status(400).send({ error: err });
        }

        return res.status(400).send();
      });
  },

  deleteListItem(req, res) {
    List.findById(req.params.listId)
      .then(list => {
        list.items.id(req.params.itemId).remove();

        list
          .save()
          .then(list => {
            return res.status(200).send("Item has been deleted");
          })
          .catch(err => {
            if (err) {
              return res.status(400).send({ error: err });
            }

            return res.status(400).send();
          });
      })
      .catch(err => {
        if (err) {
          return res.status(400).send({ error: err });
        }

        return res.status(400).send();
      });
  },

  // need to implement sign in functionality first


  getLists(req, res) {
      List.find({userId: req.param}).then(lists => {
        if(!lists) {
            return res.status(404).send('You have no lists!');
        }

        return res.status(200).send(lists);
      }).catch(err => {
          if(err) {
              return res.status(400).send({error: err});
          }

          return res.status(400).send();
      });
  }, 

  getListItems(req, res) {
    List.findOne({ _id: req.params.listId })
      .then(list => {
        if (!list) {
          return res.status(404).send();
        }

        if (list.items.length < 1) {
          return res.status(200).send("There are no items in your list");
        }

        return res.status(200).send(list.items);
      })
      .catch(err => {
        console.log(err);
        if (err) {
          return res.status(400).send({ error: err });
        }

        return res.status(400).send();
      });
  }
};
