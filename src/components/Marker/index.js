import React from 'react';

if (process.env.WEBPACK) require('./stylesheet.styl');

const Marker = ({
  title
}) =>

<div className='Marker'>
  {title}
</div>

Map.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default Marker;
