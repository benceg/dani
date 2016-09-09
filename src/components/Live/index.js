import React from 'react';

import Gig from '../Gig';

if (process.env.WEBPACK) require('./stylesheet.styl');

const Live = ({
  live
}) =>

<ul className='Live'>
  {live.map(gig =>
    <Gig key={gig.slug} {...gig} />
  )}
</ul>

export default Live;
