import React from 'react';
import head from 'lodash/head';
import get from 'lodash/get';

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
  ({formatDate(releaseDate)}) {title}
  <ul className='tracklist'>
    <img src={`${get(head(images), 'fields.file.url')}?fit=thumb&w=600&h=600&q=80`} />
    {tracklist.map((track, index) =>
      <li className='track' key={track}>{index + 1}: {track}</li>
    )}
  </ul>
</li>

export default Album;
