import get from 'lodash/get';
import head from 'lodash/head';
import find from 'lodash/find';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

import { push } from 'react-router-redux';

import client from '../../helpers/contentful';

export const LOADING_POST_CONTENT = 'LOADING_POST_CONTENT';
export const RECEIVE_POST_CONTENT = 'RECEIVE_POST_CONTENT';

export function fetchContent(slug) {
  return (dispatch, getState) => {

    const posts = get(getState(), 'blog.posts');
    const content = isArray(posts) ? find(posts, (post) => get(post, 'fields.slug') === slug) : null;

    if (!isString(slug)) {
      return dispatch(push('/'));
    } else if (slug === get(getState(), 'post.loaded')) {
      return Promise.resolve();
    } else if (content) {
      return dispatch(receiveContent({ slug, content }));
    }

    dispatch(requestContent());

    return client.getEntries({ content_type: 'blog', 'fields.slug': slug, include: 10, limit: 1 })
      .then(content => head(get(content, 'items')))
      .then(content => dispatch(receiveContent({ slug, content })))
      .catch(() => dispatch(push('/blog')));

  }
}

function requestContent() {
  return {
    type: LOADING_POST_CONTENT,
    loaded: false
  }
}

function receiveContent({ slug, content }) {
  return {
    type: RECEIVE_POST_CONTENT,
    loaded: slug,
    content
  }
}
