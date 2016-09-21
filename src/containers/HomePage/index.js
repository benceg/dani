import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import head from 'lodash/head';
import get from 'lodash/get';

import { fetchContent } from './actions';

import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';

import AppView from '../../components/AppView';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import Image from '../../components/Image';

import routerLink from '../../helpers/routerLink';

if (process.env.WEBPACK) require('./stylesheet.styl');

const tint = '#4a2f5a';

const HomePage = ({
  body,
  image,
  slug,
  title
}) =>

<AppView className='HomePage' tint={tint} title={title}>

  <Helmet meta={[{name: 'og:image', content: `${get(image, 'fields.file.url')}?fit=thumb&w=600&h=600`}]} />

  <Main>
    <Image alt={title} src={get(image, 'fields.file.url')} />
  </Main>

  <Sidebar tint={tint} fade={true}>
    <article>
      <h1>{title}</h1>
      <section>
        <ReactMarkdown source={body || ''} escapeHtml={true} renderers={{Link: routerLink}} />
      </section>
    </article>
  </Sidebar>

</AppView>

HomePage.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  body: React.PropTypes.string,
  image: React.PropTypes.object,
  title: React.PropTypes.string.isRequired
};

const mapStateToProps = ({ homePage }) => ({
  loaded: homePage.loaded,
  body: homePage.content.body,
  image: homePage.content.image,
  title: homePage.content.title
});

export default asyncConnect(
  [{
    promise: ({ store: { dispatch } }) => dispatch(fetchContent())
  }],
  mapStateToProps
)(HomePage);
