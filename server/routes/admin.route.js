const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const auth = require("../middleware/auth.middlewere");
const role = require("../middleware/role.middlewere");

router.get("/contact", auth, role([1, 2]), adminController.getContact);

module.exports = router;
