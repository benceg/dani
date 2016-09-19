import get from 'lodash/get';
import find from 'lodash/find';
import isObject from 'lodash/isObject';

import { push } from 'react-router-redux';

import { fetchContent as fetchMusicContent } from '../Music/actions';

export function fetchContent(gig) {
  return (dispatch, getState) => {
    return dispatch(
      fetchMusicContent()
    ).then(() => {
      if (!isObject(find(get(getState(), 'music.live'), {slug: gig}))) throw new Error('Live show not found.');
      return;
    }).catch(() =>
      dispatch(push('/music'))
    );
  }
}
