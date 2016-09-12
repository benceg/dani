import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import head from 'lodash/head';
import get from 'lodash/get';

// import { fetchContent } from './actions';

import ReactMarkdown from 'react-markdown';

import AppView from '../../components/AppView';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';

if (process.env.WEBPACK) require('./stylesheet.styl');

const tint = '#97357f';

const Blog = ({

}) =>

<AppView className='Blog' tint={tint} title='Blog' />

// Blog.propTypes = {
//   loaded: React.PropTypes.bool.isRequired,
//   items: React.PropTypes.array
// };

// const mapStateToProps = ({ homePage }) => ({
//   loaded: blog.loaded,
//   items: blog.items
// });

// export default asyncConnect(
//   [{
//     promise: ({ store: { dispatch } }) => dispatch(fetchContent())
//   }],
//   mapStateToProps
// )(HomePage);

export default Blog;
