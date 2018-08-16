const Todo = require('../models').Todo;

exports.getTodos = async function(req, res, next) {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch(err) {
    error(err);
    next(`Couldn't get todos.`);
  }
};

exports.createTodo = async function(req, res, next) {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json(newTodo);
  } catch(err) {
    error(err);
    next(`Failed to save the todo.`);
  }
};

exports.getTodo = async function(req, res, next) {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  } catch(err) {
    error(err);
    next(`Failed to retrieve the todo.`);
  }
};

exports.updateTodo = async function(req, res, next) {
  try {
    const updatedTodo =
      await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
  } catch(err) {
    error(err);
    next(`Failed to update the todo`);
  }
};

exports.deleteTodo = async function(req, res, next) {
  try {
    await Todo.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch(err) {
    error(err);
    next(`Failed to remove the todo`);
  }
};
