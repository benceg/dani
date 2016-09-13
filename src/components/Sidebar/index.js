import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

if (process.env.WEBPACK) require('./stylesheet.styl');

const Sidebar = ({
  children,
  fade = false,
  tint
}) =>

<div className='Sidebar'>
  <ReactCSSTransitionGroup transitionName="sidebarTransition"
    transitionAppear={true}
    transitionAppearTimeout={300}
    transitionEnterTimeout={0}
    transitionLeaveTimeout={0}
  >
    <div key='transitioner' className='transitioner' key='SidebarTransitioner'>
      {children}
    </div>
    {(fade && tint) && <div key='fade' className='fade' style={{background: `linear-gradient(to top, ${tint}, transparent`}} />}
  </ReactCSSTransitionGroup>
</div>

export default Sidebar;
