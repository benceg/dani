import React from 'react';
import Helmet from 'react-helmet';

import Menu from '../../containers/Menu';

if (process.env.WEBPACK) require('./stylesheet.styl');

const App = ({
  className,
  tint,
  title,
  description = '',
  children
}) =>

<main className={`AppView ${className}`}>

  <Helmet style={[
    {cssText: `body { background-color: ${tint}; }`}
  ]} />

  <Helmet meta={[
    {name: 'description', content: description},
    {name: 'theme-color', content: tint}
  ]} />

  <Helmet title={`${title} – Danielle Booysen`} />

  <Menu tint={tint} />

  {children}

</main>

export default App;
