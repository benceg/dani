import React from 'react';

import Album from '../../components/Album';

if (process.env.WEBPACK) require('./stylesheet.styl');

const ReleaseList = ({
  releases
}) =>

<section className='ReleaseList'>
  <h2>Releases</h2>
  <ul>
    {releases.map(release =>
      <Album key={release.slug} {...release} />
    )}
  </ul>
</section>

export default ReleaseList;
