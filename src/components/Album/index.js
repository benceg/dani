import React from 'react';
import head from 'lodash/head';
import get from 'lodash/get';
import Link from 'react-router/lib/Link';
import Color from 'color';

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

  <Link to={`/music/release/${slug}`}>

    <div className='disc' style={{backgroundColor: colour}}>
      <figure>
        <img src={`${get(head(images), 'fields.file.url')}?fit=thumb&w=600&h=600&q=80`} style={{backgroundColor: colour}} />
        <span className='record'>
          <span className='record-label' style={{backgroundColor: Color(colour).darken(0.1).hexString()}} />
        </span>
      </figure>
    </div>

    <div className='details'>
      <date dateTime={releaseDate}>{formatDate(releaseDate)}</date>
      <h3>{title}</h3>
    </div>

  </Link>

</li>

export default Album;
