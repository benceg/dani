import head from 'lodash/head';
import get from 'lodash/get';

import client from '../../helpers/contentful';

export const LOADING_WRITING_PAGE_CONTENT = 'LOADING_WRITING_PAGE_CONTENT';
export const RECEIVE_WRITING_PAGE_CONTENT = 'RECEIVE_WRITING_PAGE_CONTENT';

export function fetchContent() {
  return (dispatch, getState) => {
    if (get(getState(), 'writing.loaded') === false) {
      dispatch(requestContent());
      return client.getEntries({ 'sys.id': '5gLzTsen7GeUsUAa2soiso', include: 10 })
        .then(response => get(head(get(response, 'items')), 'fields'))
        .then(item => dispatch(receiveContent(item)));
    }
  }
}

function requestContent() {
  return {
    type: LOADING_WRITING_PAGE_CONTENT,
    loaded: false
  }
}

function receiveContent(content) {
  return {
    type: RECEIVE_WRITING_PAGE_CONTENT,
    loaded: true,
    content
  }
}
