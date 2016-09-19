import React from 'react';

import { Link } from 'react-router';

import formatDate from '../../helpers/formatDate';

if (process.env.WEBPACK) require('./stylesheet.styl');

const BlogLink = ({
  fields: {
    title,
    slug,
    article
  },
  sys: {
    createdAt
  }
}) =>

<Link className='BlogLink' to={`/blog/${slug}`}>
  <date dateTime={createdAt}>
    <span className='date'>{formatDate(createdAt, 'DD MMM', 'YYYY-MM-DDTHH:mm')}</span>
    <span className='year'>{formatDate(createdAt, 'YYYY', 'YYYY-MM-DDTHH:mm')}</span>
  </date>
  <div className='details'>
    <h3>{title}</h3>
    <div className='readingTime'>About a {Math.ceil(article.split(' ').length / 300)} minute read</div>
  </div>
</Link>

export default BlogLink;
