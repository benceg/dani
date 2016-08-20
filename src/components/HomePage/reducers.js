import {
  LOADING_HOME_PAGE_CONTENT,
  RECEIVE_HOME_PAGE_CONTENT
} from './actions'

const initialState = {
  loadingHomePageContent: false,
  homePageContent: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_HOME_PAGE_CONTENT:
      return {...state, loadingHomePageContent: action.loadingHomePageContent}
    case RECEIVE_HOME_PAGE_CONTENT:
      return {...state, loadingHomePageContent: action.loadingHomePageContent, homePageContent: action.homePageContent}
    default:
      return state
  }
}
