import React from 'react';
import Link from 'react-router/lib/Link';

import formatDate from '../../helpers/formatDate';

if (process.env.WEBPACK) require('./stylesheet.styl');

const VideoThumbnail = ({
  title,
  slug,
  date,
  tint,
  youtubeId
}) =>

<li className='VideoThumbnail' style={{color: tint}}>
  <Link to={`/music/video/${slug}`}>

    <figure>
      <img src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`} />
    </figure>

    <div className='details'>
      <h3>{title}</h3>
      <date className='date' dateTime={date}>{formatDate(date, 'MMMM Do, YYYY')}</date>
    </div>

  </Link>
</li>

export default VideoThumbnail;
