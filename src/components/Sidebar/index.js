import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

if (process.env.WEBPACK) require('./stylesheet.styl');

const Sidebar = ({
  children,
  fade = false,
  tint
}) =>

<div className='Sidebar'>
  <ReactCSSTransitionGroup transitionName="sidebarTransition" transitionAppear={true} transitionAppearTimeout={300}>
    <div className='transitioner' key='SidebarTransitioner'>
      {children}
    </div>
  </ReactCSSTransitionGroup>
  {(fade && tint) && <div className='fade' style={{background: `linear-gradient(to top, ${tint}, transparent`}} />}
</div>

export default Sidebar;
