import head from 'lodash/head';
import get from 'lodash/get';

import client from '../../helpers/contentful';

export const LOADING_HOME_PAGE_CONTENT = 'LOADING_HOME_PAGE_CONTENT';
export const RECEIVE_HOME_PAGE_CONTENT = 'RECEIVE_HOME_PAGE_CONTENT';

export function fetchContent() {
  return (dispatch, getState) => {
    if (get(getState(), 'homePage.loaded') === true) return;
    dispatch(requestContent());
    client.getEntries({ 'sys.id': '25rOGenclCAogoQ2k0M0mc', include: 10 })
      .then(({ items }) => dispatch(receiveContent(get(head(items), 'fields'))))
      .catch(error => console.error(error.message));
  }
}

export function requestContent() {
  return {
    type: LOADING_HOME_PAGE_CONTENT,
    loaded: false
  }
}

export function receiveContent(content) {
  return {
    type: RECEIVE_HOME_PAGE_CONTENT,
    loaded: true,
    content
  }
}
