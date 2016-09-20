import React from 'react';
import Color from 'color';

import Gig from '../Gig';

if (process.env.WEBPACK) require('./stylesheet.styl');

const LiveList = ({
  live,
  tint
}) =>

<section className='LiveList'>
  <h2 style={{backgroundColor: Color(tint).lighten(0.16).hexString()}}>Live</h2>
  <div>
    {live.map(gig =>
      <Gig key={gig.slug} tint={tint} {...gig} />
    )}
  </div>
</section>

export default LiveList;
