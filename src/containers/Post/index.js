import React from 'react';
import find from 'lodash/find';
import get from 'lodash/get';
import shuffle from 'lodash/shuffle';
import slice from 'lodash/slice';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Color from 'color';

import { fetchContent } from './actions';

import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';
import Disqus from 'react-disqus-thread';

import AppView from '../../components/AppView';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import BlogList from '../../components/BlogList';
import Social from '../../components/Social';

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
      slug,
      related,
      image
    },
    sys: {
      createdAt
    }
  },
  posts
}) =>

<AppView className='Post' tint={tint} title={title || 'Post'}>

  {!title && <Helmet base={{href: '/404'}} />}

  <Helmet meta={[{name: 'og:image', content: `${get(image, 'fields.file.url')}?fit=thumb&w=600&h=600`}]} />

  <Main>
    {image &&
      <img className='hero' src={`${get(image, 'fields.file.url')}?fit=thumb&w=900&h=600`} alt={title} />
    }
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
            url={`https://daniellebooysen.com${get(window, 'location.pathname')}`}
          />
        }
      </section>
    </article>
  </Main>

  <Sidebar className={(get(image, 'fields.file.url') ? 'image' : 'no-image')} tint={tint} fade={true}>
    {image &&
      <img className='sidebarHero' src={`${get(image, 'fields.file.url')}?fit=thumb&w=600&h=400`} alt={title} />
    }
    <Social title={title} />
    {related &&
      <section className='related'>
        <h4>Related Posts</h4>
        <BlogList tint={tint} posts={related} />
      </section>
    }
    {(!related && posts.length !== 0) &&
      <section className='related'>
        <h4>Recent Posts</h4>
        <BlogList tint={tint} posts={posts.slice(0,5)} />
      </section>
    }
  </Sidebar>

</AppView>

Post.propTypes = {
  loaded: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string
  ]).isRequired,
  content: React.PropTypes.object.isRequired,
  posts: React.PropTypes.array
};

const mapStateToProps = ({
  blog,
  post
}) => {
  return {
    loaded: post.loaded,
    content: post.content,
    posts: blog.posts
  }
};

export default asyncConnect(
  [{
    promise: ({ store: { dispatch }, params: { slug } }) => dispatch(fetchContent(slug))
  }],
  mapStateToProps
)(Post);
