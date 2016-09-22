import path from 'path';
import express from 'express';
import webpack from 'webpack';
import compression from 'compression';
import bodyParser from 'body-parser';

import middleware from './middleware';
import sendgrid from './sendgrid';

const app = express();

const ip = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 3000;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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

} else if (process.env.NODE_ENV === 'production') {

	app.use(express.static(path.resolve(__dirname, '../dist')));

}

app.use(express.static(path.resolve(__dirname, '../assets')));

app.get('*', middleware);

app.post('/send', sendgrid);

app.listen(port, ip, (err) => {
	if(err) {
		console.error(err);
	} else {
		console.info(`Listening at ${ip}:${port}`);
	}
});
