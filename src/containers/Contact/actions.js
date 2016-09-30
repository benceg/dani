import head from 'lodash/head';
import get from 'lodash/get';

import client from '../../helpers/contentful';

export const LOADING_CONTACT_PAGE_CONTENT = 'LOADING_CONTACT_PAGE_CONTENT';
export const RECEIVE_CONTACT_PAGE_CONTENT = 'RECEIVE_CONTACT_PAGE_CONTENT';
export const CONTACT_FORM_SENT = 'CONTACT_FORM_SENT';
export const CONTACT_FORM_RESET = 'CONTACT_FORM_RESET';
export const CONTACT_FORM_ERROR = 'CONTACT_FORM_ERROR';
export const SENDING_FORM = 'SENDING_FORM';

const ENDPOINT = '/send';

export function fetchContent() {
  return (dispatch, getState) => {
    if (get(getState(), 'contact.loaded') === false) {
      dispatch(requestContent());
      return client.getEntries({ 'sys.id': '1GzFuUdAr2GkkCYwCau44c', include: 10 })
        .then(response => get(head(get(response, 'items')), 'fields'))
        .then(item => dispatch(receiveContent(item)));
    }
  }
}

export function sendForm(fields) {
  return (dispatch, getState) => {
    dispatch(sendingForm());
    return fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })
      .then(({status}) => status === 202 ? dispatch(formSent()) : dispatch(formError()))
      .catch(() => dispatch(formError()));
  }
}

export function resetForm() {
  return {
    type: CONTACT_FORM_RESET,
    error: false,
    sending: false,
    sent: false
  }
}

function sendingForm() {
  return {
    type: SENDING_FORM,
    sending: true
  }
}

function formError() {
  return {
    type: CONTACT_FORM_ERROR,
    error: true,
    sending: false,
    sent: false
  }
}

function formSent() {
  return {
    type: CONTACT_FORM_SENT,
    error: false,
    sending: false,
    sent: true
  }
}

function requestContent() {
  return {
    type: LOADING_CONTACT_PAGE_CONTENT,
    loaded: false
  }
}

function receiveContent(content) {
  return {
    type: RECEIVE_CONTACT_PAGE_CONTENT,
    loaded: true,
    content
  }
}
