
const express = require('express');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');

// dev middleware
const devMiddleware = (app, options) => {
  const compiler = webpack(options);

  compiler.apply(new DashboardPlugin());

  const middleware = webpackDevMiddleware(compiler, {
    publicPath: options.output.publicPath,
    noInfo: true,
    silent: true
  });

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  app.get('*', (req, res) => {
    const file = fs.readFileSync(path.join(compiler.outputPath, 'index.html'));
    res.send(file.toString());
  });
}

module.exports = (options) => {
  const app = express();

  devMiddleware(app, options);

  return app;
}
