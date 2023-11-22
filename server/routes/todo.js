const express = require("express");
const { addTodo, updateTodo, getAllTodos, deleteTodo } = require("../controllers/todoController");

const router = express.Router();

router.get("/", getAllTodos);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;