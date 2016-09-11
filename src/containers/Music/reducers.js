import {
  LOADING_MUSIC_CONTENT,
  RECEIVE_MUSIC_CONTENT
} from './actions';

const initialState = {
  loaded: false,
  releases: [],
  live: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_MUSIC_CONTENT:
      return {...state, loaded: action.loaded}
    case RECEIVE_MUSIC_CONTENT:
      return {...state, loaded: action.loaded, releases: action.releases, live: action.live}
    default:
      return state
  }
}