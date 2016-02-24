
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./RootComponent.prod');
} else {
  module.exports = require('./RootComponent.dev');
}
