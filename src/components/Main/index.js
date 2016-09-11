import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

if (process.env.WEBPACK) require('./stylesheet.styl');

const Main = ({
  children
}) =>

<div className='Main'>
  <ReactCSSTransitionGroup
    transitionName="mainTransition"
    transitionAppear={true}
    transitionAppearTimeout={300}
    transitionEnterTimeout={0}
    transitionLeaveTimeout={0}
  >
    <div className='transitioner' key='MainTransitioner'>
      {children}
    </div>
  </ReactCSSTransitionGroup>
</div>

export default Main;
