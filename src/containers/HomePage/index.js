import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import ReactMarkdown from 'react-markdown';
import head from 'lodash/head';
import get from 'lodash/get';

import { fetchContent } from './actions';

import AppView from '../../components/AppView';

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
    <AppView
      className='HomePage'
      tint='#4a2f5a'
    >

      <figure>
        <img src={`${get(image, 'fields.file.url')}?w=1920&h=1080`} />
      </figure>

      <article>
        <h1>{title}</h1>
        <ReactMarkdown source={body || ''} escapeHtml={true} />
      </article>

    </AppView>
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
