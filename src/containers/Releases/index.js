import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import get from 'lodash/get'

import { fetchContent } from './actions';

export default class Releases extends Component {

  render() {

    const {
      content
    } = this.props;

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

}


const mapStateToProps = (state) => ({
  loading: state.releases.loading,
  content: state.releases.content
})

export default asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(fetchContent())
}])(connect(
  mapStateToProps
)(Releases));
