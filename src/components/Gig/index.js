import React from 'react';

if (process.env.WEBPACK) require('./stylesheet.styl');

const Gig = ({
  title,
  slug
}) =>

<li>
  {title}
</li>

export default Gig;
