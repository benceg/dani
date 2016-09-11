import React from 'react';
import { Route, DefaultRoute, IndexRoute } from 'react-router';

import HomePage from './containers/HomePage';
import Music from './containers/Music';
import Release from './containers/Release';
import Blog from './containers/Blog';

export default (
	<Route path='/'>
		<IndexRoute component={HomePage} />
		<Route path='music'>
			<IndexRoute component={Music} />
			<Route path=':release' component={Release} />
		</Route>
		<Route path='blog'>
			<IndexRoute component={Blog} />
		</Route>
	</Route>
);
