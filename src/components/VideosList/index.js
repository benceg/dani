import React from 'react';
import Color from 'color';

import VideoThumbnail from '../VideoThumbnail';

if (process.env.WEBPACK) require('./stylesheet.styl');

const VideosList = ({
  videos,
  tint
}) =>

<section className='VideosList'>
  <h2 style={{backgroundColor: Color(tint).lighten(0.16).hexString()}}>Videos</h2>
  <ul>
    {videos.map(video =>
      <VideoThumbnail key={video.slug} tint={tint} {...video} />
    )}
  </ul>
</section>

export default VideosList;
