import React from 'react';

import Album from '../../components/Album';

if (process.env.WEBPACK) require('./stylesheet.styl');

const Releases = ({
  releases
}) =>

<ul className='Music'>
  {releases.map(release =>
    <Album key={release.slug} {...release} />
  )}
</ul>

export default Releases;
