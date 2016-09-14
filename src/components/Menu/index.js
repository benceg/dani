import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import get from 'lodash/get';

if (process.env.WEBPACK) require('./stylesheet.styl');

const menuItems = [
  { title: "Home", uri: "/" },
  { title: "Music", uri: "/music" },
  { title: "Writing", uri: "/writing" },
  { title: "Blog", uri: "/blog" },
  { title: "Contact", uri: "/contact" }
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
    const activeItem = this.list.querySelector('.active').parentNode;
    this.setState({
      top: -(Math.round(activeItem.getBoundingClientRect().top) - menuOffset)
    });
  }

  handleClickOutside() {
    this.setState({
      open: false
    });
  }

  toggle(e, uri) {
    const { open } = this.state;
    if (!open || uri === location.pathname) e.preventDefault();
    this.setState({
      open: !open
    });
  }

  render() {

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
            <li key={uri} style={{color: tint}}>
              {uri === '/' && <IndexLink to={uri} onClick={(e) => this.toggle(e, uri)} {...linkProps}>{title}</IndexLink>}
              {uri !== '/' && <Link to={uri} onClick={(e) => this.toggle(e, uri)} {...linkProps}>{title}</Link>}
            </li>
          )}
        </ul>
      </div>
    )

  }

}

Menu.propTypes = {
  tint: React.PropTypes.string.isRequired
};

export default onClickOutside(Menu);
