import React from 'react';

import MediaQuery from 'react-responsive'

const sizes = [
  { breakpoint: 1681, width: 1920, height: 1280 },
  { breakpoint: 1441, width: 1680, height: 1120 },
  { breakpoint: 1081, width: 1440, height: 960 },
  { breakpoint: 961, width: 1080, height: 720 },
  { breakpoint: 769, width: 960, height: 640 },
  { breakpoint: 641, width: 768, height: 512 }
];

const Image = ({
  src,
  alt = '',
  title = '',
  className = ''
}) =>

<span>

  {sizes.map(({
    breakpoint,
    width,
    height
  }, index) =>
    <MediaQuery minWidth={sizes[index+1] ? breakpoint : 0} maxWidth={sizes[index-1] ? sizes[index-1].breakpoint : Infinity}>
      <img src={`${src}?fit=thumb&w=${width}&h=${height}`} width={width} height={height} />
    </MediaQuery>
  )}

</span>

Image.propTypes = {
  src: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string,
  title: React.PropTypes.string,
  className: React.PropTypes.string
}

export default Image;
