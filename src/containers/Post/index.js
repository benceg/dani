import React from 'react';
import find from 'lodash/find';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import { fetchContent } from './actions';

import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';
import Disqus from 'react-disqus-thread';

import AppView from '../../components/AppView';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import Map from '../../components/Map';

import routerLink from '../../helpers/routerLink';
import formatDate from '../../helpers/formatDate';

const dateFormat = 'YYYY-MM-DDTHH:mm';

if (process.env.WEBPACK) require('./stylesheet.styl');

const tint = '#f6f7f1';

const Post = ({
  content: {
    fields: {
      title,
      article,
      slug
    },
    sys: {
      createdAt
    }
  }
}) =>

<AppView className='Post' tint={tint} title={title || 'Post'}>

  {!title && <Helmet base={{href: '/404'}} />}

  <Main>
    <article>
      <h1>{title}</h1>
      <date dateTime={createdAt}>{formatDate(createdAt, 'MMMM Do, YYYY', dateFormat)} at {formatDate(createdAt, 'h:mma', dateFormat)}</date>
      <section className='article'>
        <ReactMarkdown source={article || ''} escapeHtml={true} renderers={{Link: routerLink}} />
      </section>
      <section className='comments'>
        {process.env.WEBPACK &&
          <Disqus
            shortname="danielle-booysen"
            identifier={slug}
            title={title}
            url={`https://daniellebooysen.com${document.location.pathname}`}
          />
        }
      </section>
    </article>
  </Main>

  <Sidebar tint={tint} fade={true}>
  </Sidebar>

</AppView>

Post.propTypes = {
  loaded: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string
  ]).isRequired,
  content: React.PropTypes.object.isRequired
};

const mapStateToProps = ({ post }) => {
  return {
    loaded: post.loaded,
    content: post.content
  }
};

export default asyncConnect(
  [{
    promise: ({ store: { dispatch }, params: { slug } }) => dispatch(fetchContent(slug))
  }],
  mapStateToProps
)(Post);
