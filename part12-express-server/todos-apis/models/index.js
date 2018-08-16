const mongoose = require('mongoose'),
      log = require('debug')('todos-apis:model-index');

mongoose.set('debug', true);

mongoose.connect('mongodb://localhost:27017/boot',
  { useNewUrlParser: true },
  () => { log('Connection to MongoDB established.'); });

module.exports.Todo = require('./todo');
