const express = require("express");
const { addTodo, updateTodo, getAllTodos } = require("../controllers/todoController");

const router = express.Router();

router.get("/", getAllTodos);
router.post("/", addTodo);
router.put("", updateTodo);
router.delete("", updateTodo);

module.exports = router;