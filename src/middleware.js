import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'
import serialize from 'serialize-javascript'

import reducers from './reducers';
import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware
)(createStore)

const store = createStoreWithMiddleware(reducers)

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
						<html>
							<header>
								<title>My Universal App</title>
							</header>
							<body>
								<div id='app'></div>
								<script src='bundle.js'></script>
							</body>
						</html>
					`);

				} else if (process.env.NODE_ENV == 'production') {

					res.status(200).send(`
						<!doctype html>
						<html>
							<header>
								<title>My Universal App</title>
								<link rel='stylesheet' href='bundle.css'>
							</header>
							<body>
								<div id='app'>${renderToString(
									<Provider store={store}>
										<ReduxAsyncConnect {...renderProps} />
									</Provider>
								)}</div>
								<script>window.__INITIAL_STATE__=${serialize(store.getState())};</script>
								<script src='bundle.js'></script>
							</body>
						</html>
					`);

				}

			})

		} else {

			res.status(404).send('Not found');

		}

	});
};
