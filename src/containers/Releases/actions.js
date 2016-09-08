import get from 'lodash/get';

import client from '../../helpers/contentful';

export const LOADING_RELEASES_CONTENT = 'LOADING_RELEASES_CONTENT';
export const RECEIVE_RELEASES_CONTENT = 'RECEIVE_RELEASES_CONTENT';

export function fetchContent() {
  return (dispatch, getState) => {
    if (get(getState(), 'releases.loaded') === false) {
      dispatch(requestContent());
      return client.getEntries({ content_type: 'releases', include: 10 })
        .then(({ items }) => items.map(item => item.fields))
        .then(items => dispatch(receiveContent(items)));
    }
  }
}

function requestContent() {
  return {
    type: LOADING_RELEASES_CONTENT,
    loaded: false
  }
}

function receiveContent(content) {
  return {
    type: RECEIVE_RELEASES_CONTENT,
    loaded: true,
    content
  }
}
