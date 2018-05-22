const webpack = require('webpack');

module.exports = {
  entry: `${__dirname}/docs/index.html`,
  output: {
    path: `${__dirname}/docs`,
    publicPath: '/docs/',
    filename: 'index.html',
  },
}