const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const controller = require("./controller");

router.get("/course", auth, controller.getAllCourse);
router.get("/course/:id", auth, controller.getByIdCourse);
router.post("/course", auth, controller.createCourse);
router.put("/course/:id", auth, controller.updateCourse);
router.delete("/course/:id", auth, controller.deleteCourse);

module.exports = router;
