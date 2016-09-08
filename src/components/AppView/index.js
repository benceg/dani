import React from 'react';
import Helmet from 'react-helmet';

import Menu from '../Menu';

if (process.env.WEBPACK) require('./stylesheet.styl');

const App = ({
  className,
  tint,
  children
}) =>

<main className={`AppView ${className}`}>
  <Helmet style={[{cssText: `body { background-color: ${tint}; }`}]} />
  <Menu tint={tint} />
  {children}
</main>

export default App;
