const express = require('express'),
      log = require('debug')('part30:server'),
      error = require('debug')('part30:error'),
      app = express(),
      path = require('path');

app.set('port', process.env.PORT || 4000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.send();
});

app.listen(app.get('port'), () => {
  log(`Server started listening on port ${app.get('port')}`);
});
