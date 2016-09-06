import React from 'react';
import { Link, IndexLink } from 'react-router';

if (process.env.WEBPACK) require('./stylesheet.styl');

const menuItems = [
  { title: "Home", uri: "/" },
  { title: "Releases", uri: "/releases" },
  { title: "Events", uri: "/events" },
  { title: "Contact", uri: "/contact" }
];

export default function Menu(props) {
  const {
    tint
  } = props;

  return (
    <ul className="Menu">
      {menuItems.map(i =>
        <li key={i.uri} className="">
          {(i.uri === '/'
            ? <IndexLink to={i.uri} activeClassName="active">{i.title}</IndexLink>
            : <Link to={i.uri} activeClassName="active">{i.title}</Link>
          )}
        </li>
      )}
    </ul>
  )
}
