const express = require('express'),
      log = require('debug')('todos-apis:index'),
      error = require('debug')('todos-apis:error'),
      app = express(),
      Todo = require('./models').Todo;
      todoRouter = require('./routes/todos'),
      bodyParser = require('body-parser'),
      path = require('path');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

// log url and method of each request
app.use((req, res, next) => {
  log(`${req.method} - ${req.url}`);
  next();
});

// middleware that removes X-Powered-By header from responses
app.use((req, res, next) => {
  res.set({'X-Powered-By': "none" });
  next();
});

app.use('/api/todos', todoRouter);

app.listen(app.get('port'), () => {
  log(`Server started listening on port ${app.get('port')}`);
});
