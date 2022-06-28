const { Router } = require("express")
const { todoController } = require("../controllers/todo.controller")

const router = Router()

router.post("/todo", todoController.postTodo)
router.get("/todo", todoController.getAllTodo)
router.delete("/todo/:id", todoController.removeTodoById)
router.patch("/todo/:id", todoController.patchTodoById)

module.exports = router
