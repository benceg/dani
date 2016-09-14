import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import HomePage from './containers/HomePage';
import Music from './containers/Music';
import Release from './containers/Release';
import Live from './containers/Live';
import Video from './containers/Video';
import Blog from './containers/Blog';

export default (
<Route>
	<Route path='/' component={HomePage} />
	<Route path='music'>
		<IndexRoute component={Music} />
		<Route path='release/:release' component={Release} />
		<Route path='live/:gig' component={Live} />
		<Route path='video/:video' component={Video} />
	</Route>
	<Route path='blog'>
		<IndexRoute component={Blog} />
	</Route>
</Route>
);
