import {
  LOADING_HOME_PAGE_CONTENT,
  RECEIVE_HOME_PAGE_CONTENT
} from './actions';

const initialState = {
  loaded: false,
  content: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_HOME_PAGE_CONTENT:
      return {...state, loading: action.loading}
    case RECEIVE_HOME_PAGE_CONTENT:
      return {...state, loading: action.loading, content: action.content}
    default:
      return state
  }
}
