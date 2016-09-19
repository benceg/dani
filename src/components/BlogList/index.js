import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import BlogLink from '../BlogLink';

if (process.env.WEBPACK) require('./stylesheet.styl');

const BlogList = ({ posts }) =>

<section className='BlogList'>
  <ReactCSSTransitionGroup transitionName="blogListTransition"
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}
  >
    <ul key={posts.map(post => post.sys.id).reduce((prev, curr) => `${prev},${curr}`)}>
      {posts.map(post =>
        <BlogLink key={post.sys.id} {...post} />
      )}
    </ul>
  </ReactCSSTransitionGroup>
</section>

export default BlogList;
