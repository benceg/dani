import { api } from 'prismic.io'

export const LOADING_HOME_PAGE_CONTENT = 'LOADING_HOME_PAGE_CONTENT'
export const RECEIVE_HOME_PAGE_CONTENT = 'RECEIVE_HOME_PAGE_CONTENT'

export function fetchContent() {
  return (dispatch) => {
    dispatch(requestContent())
    return api('https://daniellebooysen-test.prismic.io/api')
      .then(api => api.query('[[:d = at(document.type, "home")]]', {
        pageSize: 1,
        orderings: '[my.home.date desc]'
      }))
      .then(response => dispatch(receiveContent(response.results)))
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
    content: content[0]
  }
}
