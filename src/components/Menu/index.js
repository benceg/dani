import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import get from 'lodash/get';

if (process.env.WEBPACK) require('./stylesheet.styl');

const menuItems = [
  { title: "Home", uri: "/", loaded: "homePage.loaded" },
  { title: "Music", uri: "/music", loaded: "music.loaded" },
  { title: "Writing", uri: "/writing", loaded: "writing.loaded" },
  { title: "Blog", uri: "/blog", loaded: "blog.loaded" },
  { title: "Contact", uri: "/contact", loaded: "contact.loaded" }
];

const menuOffset = 20;

class Menu extends Component {

  constructor() {
    super();
    this.state = {
      open: (process.env.WEBPACK ? false : true),
      top: 0
    };
  }

  componentDidMount() {
    this.setState({ top: -(Math.round(this.active.getBoundingClientRect().top) - menuOffset) });
  }

  handleClickOutside() {
    this.setState({ open: false });
  }

  toggle(e, uri) {
    const { open, top } = this.state;
    if (!open || uri === location.pathname) e.preventDefault();
    this.setState({ top: (e.isDefaultPrevented() ? top : 0), open: !open });
  }

  render() {

    const {
      router
    } = this.context;

    const {
      tint
    } = this.props;

    const {
      open,
      top
    } = this.state;

    const linkProps = {
      activeClassName: 'active',
      style: {backgroundColor: tint},
    };

    return (
      <div className="Menu" style={{marginTop: menuOffset}}>
        <ul
          className={open && 'open'}
          ref={(el) => this.list = el}
          style={{transform: `translate3d(0,${(!open ? top : 0)}px,0)`}}
        >
          {menuItems.map(({ uri, title }) =>
            <li key={uri} style={{color: tint}} ref={(router.isActive(uri) ? (el) => this.active = el : null)}>
              {uri === '/' && <IndexLink to={uri} onClick={(e) => this.toggle(e, uri)} {...linkProps}>{title}</IndexLink>}
              {uri !== '/' && <Link to={uri} onClick={(e) => this.toggle(e, uri)} {...linkProps}>{title}</Link>}
            </li>
          )}
        </ul>
      </div>
    )

  }

}

Menu.contextTypes = {
  router: React.PropTypes.object
};

Menu.propTypes = {
  tint: React.PropTypes.string.isRequired
};

export default onClickOutside(Menu);
