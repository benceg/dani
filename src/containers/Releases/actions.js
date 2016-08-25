import get from 'lodash/get';

import client from '../../helpers/contentful';

export const LOADING_RELEASES_CONTENT = 'LOADING_RELEASES_CONTENT';
export const RECEIVE_RELEASES_CONTENT = 'RECEIVE_RELEASES_CONTENT';

export function fetchContent() {
  return (dispatch, getState) => {
    if (get(getState(), 'releases.loaded') === true) return;
    dispatch(requestContent());
    client.getEntries({ content_type: 'releases', include: 10 })
      .then(({ items }) => dispatch(receiveContent(items)))
      .catch(error => console.error(error.message));
  }
}

export function requestContent() {
  return {
    type: LOADING_RELEASES_CONTENT,
    loaded: false
  }
}

export function receiveContent(content) {
  return {
    type: RECEIVE_RELEASES_CONTENT,
    loaded: true,
    content
  }
}
