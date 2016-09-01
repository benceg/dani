import React from 'react';

import Menu from '../Menu';

export default function App(props) {
  return (
    <div>
      <Menu />
      {props.children}
    </div>
  )
}
