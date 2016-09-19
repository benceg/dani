import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import head from 'lodash/head';
import get from 'lodash/get';

import { fetchContent, POSTS_PER_PAGE } from './actions';

import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router';

import AppView from '../../components/AppView';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import BlogList from '../../components/BlogList';

if (process.env.WEBPACK) require('./stylesheet.styl');

const tint = '#c9d360';

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

  <Main>
    <img src={`${get(image, 'fields.file.url')}?w=1920&h=1080`} />
    {body &&
      <blockquote>
        {body.split("\n").map((line, index) =>
          <div key={index} style={{color: tint}}>{line}</div>
        )}
      </blockquote>
    }
  </Main>

  <Sidebar>

    <BlogList {...{posts}} />

    <nav className='pagination'>
      {newer && <Link to={`/blog/page/${loaded}`} className='newer'>Newer</Link>}
      {older && <Link to={`/blog/page/${loaded + 2}`} className='older'>Older</Link>}
    </nav>

  </Sidebar>

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
