const List = require("../db/models/list");

module.exports = {
  createList(req, res) {
    let newList = new List({
      name: req.body.name,
      complete: req.body.complete,
      userId: req.user._id
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
        console.log(err);
        if (err) {
          return res.status(400).send({ error: err });
        }

        return res.status(400).send();
      });
  },

  updateList(req, res) {
    List.findByIdAndUpdate(
      req.params.listId,
      { name: req.body.name, complete: req.body.complete },
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

  getLists(req, res) {
    List.find({ userId: req.user._id })
      .then(lists => {
        if (!lists) {
          console.log("no lists");
          return res.status(404).send("You have no lists!");
        }

        return res.status(200).send(lists);
      })
      .catch(err => {
        if (err) {
          console.log(err);
          return res.status(400).send({ error: err });
        }

        return res.status(400).send();
      });
  }
};
