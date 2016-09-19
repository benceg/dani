import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import BlogLink from '../BlogLink';

if (process.env.WEBPACK) require('./stylesheet.styl');

const BlogList = ({
  tint,
  posts
}) =>

<section className='BlogList'>
  <ReactCSSTransitionGroup transitionName="blogListTransition"
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}
  >
    <div className='list' key={posts.map(post => post.sys.id).reduce((prev, curr) => `${prev},${curr}`)} style={{color: tint}}>
      {posts.map(post =>
        <BlogLink key={post.sys.id} {...post} />
      )}
    </div>
  </ReactCSSTransitionGroup>
</section>

export default BlogList;
