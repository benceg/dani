import {
  LOADING_BLOG_CONTENT,
  RECEIVE_BLOG_CONTENT
} from './actions';

const initialState = {
  loaded: false,
  content: {},
  total: 0,
  posts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_BLOG_CONTENT:
      return {...state, loaded: action.loaded}
    case RECEIVE_BLOG_CONTENT:
      return {...state, loaded: action.loaded, content: action.content, posts: action.posts, total: action.total}
    default:
      return state
  }
}
