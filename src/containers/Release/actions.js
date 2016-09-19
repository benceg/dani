import get from 'lodash/get';
import find from 'lodash/find';
import isObject from 'lodash/isObject';

import { push } from 'react-router-redux';

import { fetchContent as fetchMusicContent } from '../Music/actions';

export function fetchContent(release) {
  return (dispatch, getState) => {
    return dispatch(
      fetchMusicContent()
    ).then(() => {
      if (!isObject(find(get(getState(), 'music.releases'), {slug: release}))) throw new Error('Release not found.');
      return;
    }).catch(() =>
      dispatch(push('/music'))
    );
  }
}
