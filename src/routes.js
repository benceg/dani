import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import HomePage from './containers/HomePage';
import Music from './containers/Music';
import Release from './containers/Release';
import Live from './containers/Live';
import Video from './containers/Video';
import Writing from './containers/Writing';
import Blog from './containers/Blog';
import Post from './containers/Post';
import Contact from './containers/Contact';

export default (
	<Route>
		<Route path='/' component={HomePage} />
		<Route path='music'>
			<IndexRoute component={Music} />
			<Route path='release/:release' component={Release} />
			<Route path='live/:gig' component={Live} />
			<Route path='video/:video' component={Video} />
		</Route>
		<Route path='writing'>
		 	<IndexRoute component={Writing} />
		</Route>
		<Route path='blog'>
			<IndexRoute component={Blog} />
			<Route path='page/:page' component={Blog} />
			<Route path=':slug' component={Post} />
		</Route>
		<Route path='contact'>
		 	<IndexRoute component={Contact} />
		</Route>
	</Route>
);
