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
  colour,
  releaseDate
}) =>

<li className='Album'>

  <Link to={`music/${slug}`}>
    <figure style={{backgroundColor: colour}}>
      <img src={`${get(head(images), 'fields.file.url')}?fit=thumb&w=600&h=600&q=80`} />
      <span className='record'>
        <span className='record-label' style={{backgroundColor: colour}} />
      </span>
    </figure>
    {/* <div>
      <date dateTime={releaseDate}>{formatDate(releaseDate)}</date>
      <h3>{title}</h3>
    </div> */}
  </Link>

</li>

export default Album;
