import React from 'react';
import {
  Link,
  IndexLink
} from 'react-router';

const menuItems = [
  { title: "Home", uri: "/" },
  { title: "Releases", uri: "/releases" },
  { title: "Events", uri: "/events" },
  { title: "Contact", uri: "/contact" }
];

export default function Menu(props) {
  return (
    <ul className="menu">
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
