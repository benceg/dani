import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import head from 'lodash/head';
import get from 'lodash/get';

import { fetchContent, POSTS_PER_PAGE } from './actions';

import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import Image from '../../components/Image';
import AppView from '../../components/AppView';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import BlogList from '../../components/BlogList';

if (process.env.WEBPACK) require('./stylesheet.styl');

const tint = '#9a3866';

const Blog = ({
  content: {
    title,
    body,
    image
  },
  posts,
  loaded,
  total,
  newer,
  older
}) =>

<AppView className='Blog' tint={tint} title='Blog'>

  <Helmet meta={[{name: 'og:image', content: `${get(image, 'fields.file.url')}?fit=thumb&w=600&h=600`}]} />

  <Main>
    <Image alt='Blog' src={get(image, 'fields.file.url')} />
    {body &&
      <blockquote>
        {body.split("\n").map((line, index) =>
          <div key={index} style={{color: tint}}>{line}</div>
        )}
      </blockquote>
    }
  </Main>

  <Sidebar tint={tint} fade={true}>
    <h1>Blog</h1>
    <BlogList tint={tint} posts={posts} />
  </Sidebar>

  <span className='opaqueFade' style={{backgroundColor: tint}} />

  <nav className='pagination'>
    {newer && <Link to={`/blog/page/${loaded}`} className='newer'>Newer</Link>}
    {older && <Link to={`/blog/page/${loaded + 2}`} className='older'>Older</Link>}
  </nav>

</AppView>

Blog.propTypes = {
  content: React.PropTypes.object.isRequired,
  loaded: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.number
  ]).isRequired,
  posts: React.PropTypes.array,
  total: React.PropTypes.number.isRequired,
  newer: React.PropTypes.bool.isRequired,
  older: React.PropTypes.bool.isRequired,
};

const mapStateToProps = ({ blog }) => ({
  content: blog.content,
  loaded: blog.loaded,
  posts: blog.posts,
  total: blog.total,
  newer: (blog.loaded - 1 >= 0),
  older: (Math.ceil(blog.total / POSTS_PER_PAGE) > blog.loaded + 1)
});

export default asyncConnect(
  [{
    promise: ({ store: { dispatch }, params: { page } }) => dispatch(fetchContent(page))
  }],
  mapStateToProps
)(Blog);
