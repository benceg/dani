import {
  LOADING_POST_CONTENT,
  RECEIVE_POST_CONTENT
} from './actions';

const initialState = {
  loaded: false,
  content: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_POST_CONTENT:
      return {...state, loaded: action.loaded}
    case RECEIVE_POST_CONTENT:
      return {...state, loaded: action.loaded, content: action.content}
    default:
      return state
  }
}
