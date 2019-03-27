const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");
const helper = require("../auth/helpers");

router.get("/", listController.getLists);
router.post("/create", listController.createList);
router.put("/:listId/update", listController.updateList);
router.delete("/:listId/delete", listController.deleteList);

module.exports = router;
