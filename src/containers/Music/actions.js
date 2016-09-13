import get from 'lodash/get';
import head from 'lodash/head';
import { parse } from 'fecha';

import client from '../../helpers/contentful';

export const LOADING_MUSIC_CONTENT = 'LOADING_MUSIC_CONTENT';
export const RECEIVE_MUSIC_CONTENT = 'RECEIVE_MUSIC_CONTENT';

export function fetchContent() {
  return (dispatch, getState) => {
    if (get(getState(), 'music.loaded') === true) return Promise.resolve();
    dispatch(requestContent())
    return dispatch(() =>
      Promise.all([
        client.getEntries({ 'sys.id': '7DD77oDfEsG4k6geOwYCic', include: 10 }),
        client.getEntries({ content_type: 'releases', include: 10, order: '-fields.releaseDate' }),
        client.getEntries({ content_type: 'live', include: 10, order: 'fields.date' })
      ])
    ).then(content =>
      dispatch(receiveContent(content))
    )
  }
}

function requestContent() {
  return {
    type: LOADING_MUSIC_CONTENT,
    loaded: false
  }
}

function receiveContent([
  content,
  releases,
  live
]) {
  return {
    type: RECEIVE_MUSIC_CONTENT,
    loaded: true,
    content: get(head(get(content, 'items')), 'fields'),
    releases: releases.items.map(item => item.fields),
    live: live.items.filter(({ fields }) => (parse(fields.date, 'YYYY-MM-DD').getTime() >= new Date().getTime())).map(item => item.fields)
  }
}
