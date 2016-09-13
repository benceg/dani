import React from 'react';
import { Route, DefaultRoute, IndexRoute } from 'react-router';

import HomePage from './containers/HomePage';
import Music from './containers/Music';
import Release from './containers/Release';
import Live from './containers/Live';
import Blog from './containers/Blog';

export default (
	<Route path='/'>
		<IndexRoute component={HomePage} />
		<Route path='music'>
			<IndexRoute component={Music} />
			<Route path='release/:release' component={Release} />
			<Route path='live/:gig' component={Live} />
		</Route>
		<Route path='blog'>
			<IndexRoute component={Blog} />
		</Route>
	</Route>
);
