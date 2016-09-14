import React, { Component } from 'react';
import Link from 'react-router/lib/Link';
import IndexLink from 'react-router/lib/IndexLink';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import get from 'lodash/get';

import { toggleOpen, changeTop } from './actions';

import getOffset from '../../helpers/getOffset';

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

  shouldComponentUpdate(props) {
    const { top, open } = this.props;
    return (props.top !== top || props.open !== open);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const activeItem = this.list.querySelector(`.active`).parentNode;
    dispatch(changeTop(getOffset(activeItem, menuOffset)));
  }

  handleClickOutside() {
    const { dispatch, open } = this.props;
    if (!open) return;
    const activeItem = this.list.querySelector(`.active`).parentNode;
    dispatch(toggleOpen(false));
    dispatch(changeTop(getOffset(activeItem, menuOffset)));
  }

  toggle(e) {
    const { dispatch, open } = this.props;
    if (!open) e.preventDefault();
    dispatch(toggleOpen(!open));
    dispatch(changeTop(open ? 0 : getOffset(e.target.parentNode, menuOffset)));
  }

  render() {

    const {
      open,
      top,
      tint
    } = this.props;

    const linkProps = {
      activeClassName: 'active',
      style: {backgroundColor: tint},
      onClick: (e) => this.toggle(e)
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
              {uri === '/' && <IndexLink to={uri} {...linkProps}>{title}</IndexLink>}
              {uri !== '/' && <Link to={uri} {...linkProps}>{title}</Link>}
            </li>
          )}
        </ul>
      </div>
    )

  }

}

Menu.propTypes = {
  tint: React.PropTypes.string.isRequired,
  open: React.PropTypes.bool.isRequired,
  top: React.PropTypes.number.isRequired
};

const mapStateToProps = ({ menu }) => ({
  open: menu.open,
  top: menu.top
});

export default connect(mapStateToProps)(onClickOutside(Menu));
