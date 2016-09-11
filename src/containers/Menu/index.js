import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';

if (process.env.WEBPACK) require('./stylesheet.styl');

const menuItems = [
  { title: "Home", uri: "/" },
  { title: "Music", uri: "/music" },
  { title: "Writing", uri: "/writing" },
  { title: "Blog", uri: "/blog" },
  { title: "Contact", uri: "/contact" }
];

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
    const activeItem = this.list.querySelector(`[href="${route}"]`).parentNode;
    this.setState({
      top: `-${Math.round(activeItem.getBoundingClientRect().top - 20)}px`
    });
    console.log(route);
  }

  toggle(e) {
    const { open } = this.state;
    if (open) {
      this.setState({
        open: false
      });
    } else {
      e.preventDefault();
      e.stopPropagation();
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

    return (
      <div className="Menu">
        <ul
          className={open ? 'open' : 'closed'}
          ref={(el) => this.list = el}
          style={{transform: (!open ? `translateY(${top})` : 'none')}}
          onClick={(e) => this.toggle(e)}
        >
          {menuItems.map(({ uri, title }, index) =>
            <li key={uri} style={{color: tint}}>
              {(uri === '/'
                ? <IndexLink to={uri} activeClassName="active">{title}</IndexLink>
                : <Link to={uri} activeClassName="active">{title}</Link>
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
  route: routing.locationBeforeTransitions.pathname
});

export default connect(
  mapStateToProps
)(Menu);
