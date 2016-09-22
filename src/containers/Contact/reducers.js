import {
  LOADING_CONTACT_PAGE_CONTENT,
  RECEIVE_CONTACT_PAGE_CONTENT,
  CONTACT_FORM_SENT,
  CONTACT_FORM_RESET,
  CONTACT_FORM_ERROR,
  SENDING_FORM
} from './actions';

const initialState = {
  loaded: false,
  sent: false,
  error: false,
  sending: false,
  content: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_CONTACT_PAGE_CONTENT:
      return {...state, loaded: action.loaded}
    case RECEIVE_CONTACT_PAGE_CONTENT:
      return {...state, loaded: action.loaded, content: action.content}
    case CONTACT_FORM_SENT:
    case CONTACT_FORM_RESET:
    case CONTACT_FORM_ERROR:
      return {...state, sent: action.sent, sending: action.sending, error: action.error}
    case SENDING_FORM:
      return {...state, sending: action.sending}
    default:
      return state
  }
}
