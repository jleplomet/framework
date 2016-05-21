
const express       = require('express');
const logger        = require('./logger');
const ngrok         = require('ngrok');
const frontend      = require('./middleware/frontend');
const webpackConfig = require('../webpack/development');

const app         = express();

app.use(frontend(webpackConfig));

const port = 3000;

app.listen(port, err => {
  if (err) {
    return logger.error(err)
  }

  ngrok.connect(port, (innerErr, url) => {
    if (innerErr) {
      return logger.error(innerErr);
    }

    logger.appStarted(port, url);
  });
})
