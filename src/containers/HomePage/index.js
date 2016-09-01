import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import head from 'lodash/head';
import get from 'lodash/get';

import { fetchContent } from './actions';

import ReactMarkdown from 'react-markdown';

if (process.env.WEBPACK) require('./stylesheet.styl');

function HomePage(props) {

  const {
    loaded,
    body,
    image,
    slug,
    title
  } = props;

  return (
    <div>

      <div>Title: {title}</div>

      <img src={`${get(image, 'fields.file.url')}?w=1920&h=1080`} />

      <ReactMarkdown source={body || ''} escapeHtml={true} />

    </div>
  );

}

HomePage.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  body: React.PropTypes.string,
  image: React.PropTypes.object,
  slug: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};

const mapStateToProps = ({ homePage }) => ({
  loaded: homePage.loaded,
  body: homePage.content.body,
  image: homePage.content.image,
  slug: homePage.content.slug,
  title: homePage.content.title
});

export default asyncConnect(
  [{
    promise: ({ store: { dispatch } }) => dispatch(fetchContent())
  }],
  mapStateToProps
)(HomePage);
