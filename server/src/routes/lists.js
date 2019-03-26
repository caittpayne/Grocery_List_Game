const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");
const helper = require("../auth/helpers");

router.get("/", listController.getLists);
router.get("/:listId/items", listController.getListItems);
router.post("/create", listController.createList);
router.post("/:listId/items/create", listController.createListItem);
router.put("/:listId/update", listController.updateList);
router.put("/:listId/items/:itemId/update", listController.updateListItem);
router.delete("/:listId/delete", listController.deleteList);
router.delete("/:listId/items/:itemId/delete", listController.deleteListItem);

module.exports = router;
