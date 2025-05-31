const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middlewere");

router.get("/me", auth, userController.getMe);

module.exports = router;
