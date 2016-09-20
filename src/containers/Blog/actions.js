import get from 'lodash/get';
import head from 'lodash/head';
import isString from 'lodash/isString';

import client from '../../helpers/contentful';

export const POSTS_PER_PAGE = 8;
export const LOADING_BLOG_CONTENT = 'LOADING_BLOG_CONTENT';
export const RECEIVE_BLOG_CONTENT = 'RECEIVE_BLOG_CONTENT';

export function fetchContent(pg = 1) {
  return (dispatch, getState) => {
    const page = (parseInt(pg) > 0 ? parseInt(pg) - 1 : 0);
    const content = get(getState(), 'blog.content');
    if (get(getState(), 'blog.loaded') === page) return Promise.resolve();
    dispatch(requestContent());
    return dispatch(() =>
      Promise.all([
        (isString(get(content, 'title')) ? Promise.resolve(content) : client.getEntries({ 'sys.id': '5Zg2Nc8p5CaawmecqC8eaQ', include: 10 })),
        client.getEntries({ content_type: 'blog', include: 10, skip: POSTS_PER_PAGE * page, limit: POSTS_PER_PAGE, order: '-sys.createdAt' })
      ])
    ).then(response =>
      dispatch(receiveContent(page, response))
    )
  }
}

function requestContent() {
  return (dispatch, getState) => {
    return dispatch({
      type: LOADING_BLOG_CONTENT,
      loaded: get(getState(), 'blog.loaded') || false
    })
  }
}

function receiveContent(page, [
  content,
  posts
]) {
  return {
    type: RECEIVE_BLOG_CONTENT,
    loaded: page,
    total: posts.total,
    posts: posts.items,
    content: (get(content, 'title') ? content : get(head(get(content, 'items')), 'fields'))
  }
}
