const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const {
  getAllCategories,
  createCategories,
  updateCategories,
  getByIdCategories,
  deleteCategories,
} = require("./controller");

router.get("/categories", auth, getAllCategories);
router.get("/categories/:id", auth, getByIdCategories);
router.post("/categories", auth, createCategories);
router.put("/categories/:id", auth, updateCategories);
router.delete("/categories/:id", auth, deleteCategories);

module.exports = router;
