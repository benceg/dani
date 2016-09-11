import React from 'react';
import head from 'lodash/head';
import get from 'lodash/get';
import { Link } from 'react-router';

import formatDate from '../../helpers/formatDate';

if (process.env.WEBPACK) require('./stylesheet.styl');

const Album = ({
  slug,
  title,
  images,
  tracklist,
  releaseDate
}) =>

<li className='Album'>
  <img src={`${get(head(images), 'fields.file.url')}?fit=thumb&w=600&h=600&q=80`} />
  <h2>
    <Link to={`music/${slug}`}>{formatDate(releaseDate)} {title}</Link>
  </h2>
</li>

export default Album;
