import head from 'lodash/head';
import get from 'lodash/get';

import client from '../../helpers/contentful';

export const LOADING_HOME_PAGE_CONTENT = 'LOADING_HOME_PAGE_CONTENT';
export const RECEIVE_HOME_PAGE_CONTENT = 'RECEIVE_HOME_PAGE_CONTENT';

export function fetchContent() {
  return dispatch => {
    dispatch(requestContent());
    return client.getEntries({ 'sys.id': '25rOGenclCAogoQ2k0M0mc', include: 10 })
      .then(response => get(head(get(response, 'items')), 'fields'))
      .then(item => dispatch(receiveContent(item)));
  }
}

function requestContent() {
  return {
    type: LOADING_HOME_PAGE_CONTENT,
    loaded: false
  }
}

function receiveContent(content) {
  return {
    type: RECEIVE_HOME_PAGE_CONTENT,
    loaded: true,
    content
  }
}
