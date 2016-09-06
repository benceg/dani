import React from 'react';
import { Route, IndexRoute } from 'react-router';

import HomePage from './containers/HomePage';
import Releases from './containers/Releases';

export default (
	<Route path='/'>
		<IndexRoute component={HomePage} />
		<Route path='releases' component={Releases} />
	</Route>
);
