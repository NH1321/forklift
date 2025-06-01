const express = require("express");
const router = express.Router();
const guessController = require("../controllers/guess.controller");

router.post("/contact", guessController.createContact);

module.exports = router;
