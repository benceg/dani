import React from 'react';
import { Link, IndexLink } from 'react-router';

if (process.env.WEBPACK) require('./stylesheet.styl');

const menuItems = [
  { title: "Home", uri: "/" },
  { title: "Music", uri: "/music" },
  { title: "Writing", uri: "/writing" },
  { title: "Contact", uri: "/contact" }
];

const Menu = ({
  tint
}) =>

<ul className="Menu">
  {menuItems.map(i =>
    <li key={i.uri} style={{color: tint}} className="">
      {(i.uri === '/'
        ? <IndexLink to={i.uri} activeClassName="active">{i.title}</IndexLink>
        : <Link to={i.uri} activeClassName="active">{i.title}</Link>
      )}
    </li>
  )}
</ul>

export default Menu;
