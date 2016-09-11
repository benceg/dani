import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
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
    const { route } = this.props;
    this.transformList(route);
  }

  transformList(route) {
    const activeItem = this.list.querySelector(`.active`).parentNode;
    this.setState({
      top: `-${Math.round(activeItem.getBoundingClientRect().top - menuOffset)}px`
    });
  }

  toggle(e) {
    const { open } = this.state;
    if (open) {
      this.setState({
        open: false
      });
    } else {
      e.preventDefault();
      this.setState({
        open: true
      });
    }
  }
  
  render() {

    const {
      tint,
      route
    } = this.props;

    const {
      open,
      top
    } = this.state;

    const linkProps = {
      activeClassName: 'active',
      style: {backgroundColor: tint},
      onClick: (e) => this.toggle(e)
    };

    return (
      <div className="Menu" style={{marginTop: menuOffset}}>

        <ul
          className={open ? 'open' : 'closed'}
          ref={(el) => this.list = el}
          style={{transform: (!open ? `translateY(${top})` : 'none')}}
        >

          {menuItems.map(({ uri, title }, index) =>
            <li key={uri} style={{color: tint}}>
              {(uri === '/'
                ? <IndexLink to={uri} {...linkProps}>{title}</IndexLink>
                : <Link to={uri} {...linkProps}>{title}</Link>
              )}
            </li>
          )}

        </ul>

      </div>
    )

  }

}

const mapStateToProps = ({ routing }, { tint }) => ({
  tint,
  route: get(routing, 'locationBeforeTransitions.pathname')
});

export default connect(
  mapStateToProps
)(Menu);
