import React from 'react';
import find from 'lodash/find';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Color from 'color';

import { push } from 'react-router-redux';

import { fetchContent } from './actions';

import formatDate from '../../helpers/formatDate';

import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';
import YouTube from 'react-youtube';

import AppView from '../../components/AppView';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';

import routerLink from '../../helpers/routerLink';

if (process.env.WEBPACK) require('./stylesheet.styl');

const tint = '#521e3a';

const Video = ({
  title,
  date,
  youtubeId,
  details
}) =>

<AppView className='Video' tint={tint} title={title || 'Video'}>

  {!title && <Helmet base={{href: '/404'}} />}

  <Main>
    <YouTube videoId={youtubeId} opts={{playerVars: {autoplay: true}}} />
  </Main>

  <Sidebar tint={tint} fade={true}>
    <article>
      <h1>{title}</h1>
      <date dateTime={date} style={{color: Color(tint).lighten(1.6).hexString()}}>{formatDate(date, 'MMMM Do, YYYY')}</date>
      {details &&
        <section>
          <ReactMarkdown source={details || ''} escapeHtml={true} renderers={{Link: routerLink}} />
        </section>
      }
    </article>
  </Sidebar>

</AppView>

Video.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  youtubeId: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  details: React.PropTypes.string
};

const mapStateToProps = ({ music }, { params }) => {
  const video = find(music.videos, {slug: params.video});
  return {
    loaded: music.loaded,
    ...video
  }
};

export default asyncConnect(
  [{
    promise: ({ store: { dispatch }, params: { video } }) => dispatch(fetchContent(video))
  }],
  mapStateToProps
)(Video);
