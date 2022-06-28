const Todo = require("../models/Todo.model")

module.exports.todoController = {
  postTodo: async (req, res) => {
    try {
      const todo = await Todo.create({
        text: req.body.text,
      })
      return res.json(todo)
    } catch (e) {
      res.json(e.message)
    }
  },

  getAllTodo: async (req, res) => {
    try {
      const todo = await Todo.find()
      res.json(todo)
    } catch (e) {
      res.json(e)
    }
  },

  removeTodoById: async (req, res) => {
    try {
      await Todo.findByIdAndRemove(req.params.id)
      res.json("Todo was deleted")
    } catch (e) {
      res.json(e)
    }
  },

  patchTodoById: async (req, res) => {
    try {
     const todo =  await Todo.findByIdAndUpdate(req.params.id, {
        completed: req.body.completed,
      }, {new: true})
      res.json(todo)
    } catch (e) {
      res.json(e)
    }
  },
}
