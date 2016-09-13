import React from 'react';
import fecha from 'fecha';
import Color from 'color';

import formatDate from '../../helpers/formatDate';

import { Link } from 'react-router';

if (process.env.WEBPACK) require('./stylesheet.styl');

const Gig = ({
  title,
  date,
  venueName,
  tint,
  slug
}) =>

<Link className='Gig' to={`/music/live/${slug}`} style={{color: tint}}>

  <date dateTime={date} style={{backgroundColor: Color(tint).lighten(0.25).hexString()}}>
    <span className='date'>{formatDate(date, 'DD MMM')}</span>
    <span className='year'>{formatDate(date, 'YYYY')}</span>
  </date>

  <div className='details'>
    <h3>{title}</h3>
    <div className='venue'>{venueName}</div>
  </div>

</Link>

export default Gig;
