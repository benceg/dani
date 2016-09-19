import React from 'react';

import { Link } from 'react-router';

import formatDate from '../../helpers/formatDate';

if (process.env.WEBPACK) require('./stylesheet.styl');

const BlogLink = ({
  fields: {
    title,
    slug
  },
  sys: {
    createdAt
  }
}) =>

<li className='BlogLink'>
  <Link to={`/blog/${slug}`}>
    <h3>{title}</h3>
    <date dateTime={createdAt}>{formatDate(createdAt, 'MMMM Do, YYYY', 'YYYY-MM-DDTHH:mm')}</date>
  </Link>
</li>

export default BlogLink;
