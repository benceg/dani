import React from 'react';
import Helmet from 'react-helmet';

import Menu from '../Menu';

if (process.env.WEBPACK) require('./stylesheet.styl');

export default function App(props) {
  const {
    className,
    tint,
    children
  } = props;

  return (
    <div className={`AppView ${className}`}>

      <Helmet style={[{cssText: `body { background-color: ${tint}; }`}]} />

      <Menu tint={tint} />

      {children}

    </div>
  )
}
