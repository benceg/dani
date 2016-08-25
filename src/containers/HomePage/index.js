import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import head from 'lodash/head';
import get from 'lodash/get';

import { fetchContent } from './actions';

import ReactMarkdown from 'react-markdown';

class HomePage extends Component {

  render() {

    const {
      loaded,
      content
    } = this.props;

    const {
      body,
      image,
      slug,
      title
    } = content;

    return (
      <div>

        <div>Title: {title}</div>

        <img src={`${get(image, 'fields.file.url')}?w=1920&h=1080`} />

        <ReactMarkdown source={body || ''} escapeHtml={true} />

      </div>
    );

  }

}

const mapStateToProps = (state) => ({
  loading: state.homePage.loading,
  content: state.homePage.content
})

export default asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(fetchContent())
}])(connect(
  mapStateToProps
)(HomePage));
