import path from 'path';
import express from 'express';
import webpack from 'webpack';
import middleware from './middleware';

const app = express();

const ip = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {

	const config = require('../webpack.config.dev');
	const compiler = webpack(config);

	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath,
		stats: {
			assets: false,
			colors: true,
			version: false,
			hash: false,
			timings: false,
			chunks: false,
			chunkModules: false
		}
	}));

	app.use(require('webpack-hot-middleware')(compiler));

	// app.use(express.static(path.resolve(__dirname, 'src')));

} else if (process.env.NODE_ENV === 'production') {

	app.use(express.static(path.resolve(__dirname, 'dist')));

}

app.get('*', middleware);

app.listen(port, ip, (err) => {
	if(err) {
		console.error(err);
	} else {
		console.info(`Listening at ${ip}:${port}`);
	}
});
