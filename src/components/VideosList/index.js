import React from 'react';

import VideoThumbnail from '../VideoThumbnail';

if (process.env.WEBPACK) require('./stylesheet.styl');

const VideosList = ({
  videos,
  tint
}) =>

<section className='VideosList'>
  <h2>Videos</h2>
  <ul>
    {videos.map(video =>
      <VideoThumbnail key={video.slug} tint={tint} {...video} />
    )}
  </ul>
</section>

export default VideosList;
