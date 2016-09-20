import React from 'react';
import Color from 'color';

import Album from '../../components/Album';

if (process.env.WEBPACK) require('./stylesheet.styl');

const ReleaseList = ({
  releases,
  tint
}) =>

<section className='ReleaseList'>
  <h2 style={{backgroundColor: Color(tint).lighten(0.16).hexString()}}>Releases</h2>
  <ul>
    {releases.map(release =>
      <Album key={release.slug} {...release} />
    )}
  </ul>
</section>

export default ReleaseList;
