import { api } from 'prismic.io';
import get from 'lodash/get';

export const LOADING_RELEASES_CONTENT = 'LOADING_RELEASES_CONTENT';
export const RECEIVE_RELEASES_CONTENT = 'RECEIVE_RELEASES_CONTENT';

export function fetchContent() {
  return (dispatch, getState) => {
    if (get(getState(), 'releases.loaded') === true) return;
    dispatch(requestContent());
    return api('https://daniellebooysen-test.prismic.io/api')
      .then(api => api.query('[[:d = at(document.type, "releases")]]', {
        pageSize: 1,
        orderings: '[my.releases.date desc]'
      }))
      .then(({ results }) => dispatch(receiveContent(results)))
      .catch(error => console.error(error))
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
