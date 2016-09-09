import React from 'react';
import { Route, IndexRoute } from 'react-router';

import HomePage from './containers/HomePage';
import Music from './containers/Music';

export default (
	<Route path='/'>
		<IndexRoute component={HomePage} />
		<Route path='music' component={Music} />
	</Route>
);
