const router = require('express').Router(),
      log = require('debug')('todos-apis:todo-routes'),
      error = require('debug')('todos-apis:error'),
      db = require('../models'),
      Todo = db.Todo
      helpers = require('../helpers/todos');

router.route('/')
  .get(helpers.getTodos)
  .post(helpers.createTodo);

router.route('/:id')
  .get(helpers.getTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo);

module.exports = router;
