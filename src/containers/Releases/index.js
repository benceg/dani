import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import get from 'lodash/get'

import { fetchContent } from './actions';

if (process.env.WEBPACK) require('./stylesheet.styl');

function Releases(props) {

  const {
    content
  } = props;

  return (
    <ul>
      {content.map(item => {

        const {
          slug,
          title
        } = item.fields;

        return (
          <li key={slug}>{title}</li>
        );

      })}
    </ul>
  )

}

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
