const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer-stylus');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const jeet = require('jeet');
const nib = require('nib');

module.exports = {
	entry: [
		'whatwg-fetch',
		'babel-polyfill',
		path.resolve(__dirname, 'src')
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				WEBPACK: true
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
		  comments: false,
			sourceMap: false
		}),
		new webpack.LoaderOptionsPlugin({
		  options: {
				stylus: {
					use: [
			      jeet(),
			      nib(),
			      autoprefixer()
			    ],
					import: [
						path.resolve(__dirname, './src/globals/globals.styl')
					]
				}
		  }
		}),
		new ExtractTextPlugin('bundle.css'),
		new Visualizer()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract('css!stylus'),
				include: path.resolve(__dirname, 'src')
			}
		]
	}
};
