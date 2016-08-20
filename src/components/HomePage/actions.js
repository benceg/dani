import { api } from 'prismic.io'

export const LOADING_HOME_PAGE_CONTENT = 'LOADING_HOME_PAGE_CONTENT'
export const RECEIVE_HOME_PAGE_CONTENT = 'RECEIVE_HOME_PAGE_CONTENT'

export function fetchHomePageContent() {
  return (dispatch) => {
    dispatch(requestHomePageContent())
    api('https://daniellebooysen-test.prismic.io/api')
      .then(api => api.query('[[:d = at(document.type, "home")]]', {
        pageSize: 1,
        orderings: '[my.home.date desc]'
      }))
      .then(response => dispatch(receiveHomePageContent(response.results)))
  }
}

export function requestHomePageContent() {
  return {
    type: LOADING_HOME_PAGE_CONTENT,
    loadingHomePageContent: true
  }
}

export function receiveHomePageContent(content) {
  return {
    type: RECEIVE_HOME_PAGE_CONTENT,
    loadingHomePageContent: false,
    homePageContent: content
  }
}
