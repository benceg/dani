import React from 'react';
import { Route, IndexRoute } from 'react-router';

import HomePage from './components/HomePage';

export default (
	<Route path='/'>
		<IndexRoute component={HomePage} />
		{/*<Route path='page' component={Page} />*/}
	</Route>
);
