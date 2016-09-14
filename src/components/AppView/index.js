import React from 'react';
import Color from 'color';

import Helmet from 'react-helmet';

import Menu from '../../components/Menu';

if (process.env.WEBPACK) require('./stylesheet.styl');

const App = ({
  className,
  tint,
  title,
  description = '',
  children
}) =>

<main className={`AppView ${className}`}>

  <Helmet
    title={`${title} – Danielle Booysen`}
    style={[
      {cssText: `body { background-color: ${tint}; }`}
    ]}
    meta={[
      {name: 'description', content: description},
      {name: 'theme-color', content: tint}
    ]}
    htmlAttributes={{'data-theme': (Color(tint).dark() ? 'dark' : 'light')}}
  />

  <Menu tint={tint} />

  {children}

</main>

export default App;
