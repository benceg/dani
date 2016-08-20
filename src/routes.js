import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';

export default (
	<Route path='/'>
		<IndexRoute component={App} />
		{/*<Route path='page' component={Page} />*/}
	</Route>
);
