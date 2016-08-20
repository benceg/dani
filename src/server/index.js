require('babel-register')
require('babel-polyfill')

const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
const rootDir = require('path').resolve(__dirname, '..', '..')
const webpackIsomorphicAssets = require(rootDir + 'webpack/assets').default

global.__CLIENT__ = false
global.__SERVER__ = true
global.__DISABLE_SSR__ = false
global.__DEVELOPMENT__ = config.isProduction

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicAssets)
  .development(!config.isProduction)
  .server(rootDir, () => { require('./main') })
