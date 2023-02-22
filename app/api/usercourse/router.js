const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const controller = require("./controller");

router.get("/usercourse", auth, controller.getAllUserCourse);
router.get("/usercourse/:id", auth, controller.getByIdUserCourse);
router.post("/usercourse", auth, controller.createUserCourse);
router.put("/usercourse/:id", auth, controller.updateUserCourse);
router.delete("/usercourse/:id", auth, controller.deleteUserCourse);


module.exports = router;
