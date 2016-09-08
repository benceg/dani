import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import get from 'lodash/get'

import { fetchContent } from './actions';

if (process.env.WEBPACK) require('./stylesheet.styl');

const Releases = ({
  content
}) =>

<ul>
  {content.map(({
    slug,
    title
  }) =>
    <li key={slug}>{title}</li>
  )}
</ul>

Releases.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  content: React.PropTypes.array.isRequired
};

const mapStateToProps = ({ releases }) => ({
  loaded: releases.loaded,
  content: releases.content
});

export default asyncConnect(
  [{
    promise: ({ store: { dispatch } }) => dispatch(fetchContent())
  }],
  mapStateToProps
)(Releases);
