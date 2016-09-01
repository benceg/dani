const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer-stylus');
const jeet = require('jeet');
const nib = require('nib');

module.exports = {
	devtool: 'eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		path.resolve(__dirname, 'src')
	],
	output: {
		path: path.resolve(__dirname, 'src'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				WEBPACK: true
			}
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				include: path.resolve(__dirname, 'src'),
				query: {
					presets: ['react-hmre']
				}
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.styl$/,
				loader: 'style!css!stylus',
				include: path.resolve(__dirname, 'src')
			}
		]
	},
	stylus: {
		use: [
      jeet(),
      nib(),
      autoprefixer()
    ]
	}
};
