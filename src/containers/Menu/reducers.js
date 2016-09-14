import {
  TOGGLE_OPEN,
  CHANGE_TOP
} from './actions';

const initialState = {
  open: !process.env.WEBPACK,
  top: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_OPEN:
      return {...state, open: action.open}
    case CHANGE_TOP:
      return {...state, top: action.top}
    default:
      return state
  }
}
