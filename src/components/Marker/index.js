import React from 'react';

if (process.env.WEBPACK) require('./stylesheet.styl');

const Marker = ({
  title,
  tint
}) =>

<div className='Marker' style={{backgroundColor: tint}}>
  {title}
</div>

Map.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default Marker;
