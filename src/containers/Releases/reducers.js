import {
  LOADING_RELEASES_CONTENT,
  RECEIVE_RELEASES_CONTENT
} from './actions';

const initialState = {
  loaded: false,
  content: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_RELEASES_CONTENT:
      return {...state, loaded: action.loaded}
    case RECEIVE_RELEASES_CONTENT:
      return {...state, loaded: action.loaded, content: action.content}
    default:
      return state
  }
}
