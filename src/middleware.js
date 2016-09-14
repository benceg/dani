import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import match from 'react-router/lib/match';
import RouterContext from 'react-router/lib/RouterContext';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import serialize from 'serialize-javascript';
import Helmet from "react-helmet";

import reducers from './reducers';
import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducers);

export default (req, res) => {
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

		if (error) {

			res.status(500).send(error.message);

		} else if (redirectLocation) {

			res.redirect(302, redirectLocation.pathname + redirectLocation.search);

		} else if (renderProps) {

			loadOnServer({ ...renderProps, store }).then(() => {

				if(process.env.NODE_ENV == 'development') {

					res.status(200).send(`
						<!doctype html>
						<html lang="en">
							<head>
								<meta charset="utf-8">
								<meta name="viewport" content="width=device-width, initial-scale=1">
								<title>Danielle Booysen</title>
							</head>
							<body>
								<div id="app"></div>
								<script src="/bundle.js"></script>
							</body>
						</html>
					`);

				} else if (process.env.NODE_ENV == 'production') {

					const output = renderToString(
						<Provider store={store}>
							<ReduxAsyncConnect {...renderProps} />
						</Provider>
					);

					const head = Helmet.rewind();
					const errorRoute = (head.base && head.base.toString().indexOf('404') > -1);

					if (errorRoute) {

						res.status(404).send('Not found');

					} else {

						res.status(200).send(`
							<!doctype html>
							<html lang="en" ${head.htmlAttributes.toString()}>
								<head>
									<meta charset="utf-8">
									<meta name="viewport" content="width=device-width, initial-scale=1">
									${head.title.toString()}
			            ${head.meta.toString()}
			            ${head.link.toString()}
			            ${head.style.toString()}
									<link rel="stylesheet" href="/bundle.css">
									<meta name="robots" content="noindex, nofollow">
								</head>
								<body>
									<div id="app">${output}</div>
									<script>window.__INITIAL_STATE__=${serialize(store.getState())};</script>
									<script src="/bundle.js"></script>
								</body>
							</html>
						`);

					}

				}

			})

		} else {

			res.status(404).send('Not found');

		}

	});
};
