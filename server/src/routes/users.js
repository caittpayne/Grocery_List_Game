const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/create", userController.createUser);
router.post("/signIn", userController.signIn);
router.get("/:id", userController.getUser); 

module.exports = router;
