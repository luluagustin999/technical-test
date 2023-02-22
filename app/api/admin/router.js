const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/admin/signin", controller.signin);
router.post("/admin/signup", controller.signup);

module.exports = router;
