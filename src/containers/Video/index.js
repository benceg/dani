import React from 'react';
import find from 'lodash/find';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Color from 'color';

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

const tint = '#98d9e8';

const Video = ({
  title,
  date,
  youtubeId,
  details
}) =>

<AppView className='Video' tint={tint} title={title}>

  {!title && <Helmet base={{href: '/404'}} />}

  <Helmet meta={[{name: 'og:image', content: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}]} />

  <Sidebar tint={tint} fade={true}>
    <article>
      <h1>{title}</h1>
      <date dateTime={date} style={{color: Color(tint).darken(0.8).hexString()}}>{formatDate(date, 'MMMM Do, YYYY')}</date>
      {details &&
        <section>
          <ReactMarkdown source={details || ''} escapeHtml={true} renderers={{Link: routerLink}} />
        </section>
      }
    </article>
  </Sidebar>

  <Main>
    <YouTube videoId={youtubeId} opts={{playerVars: {autoplay: true, modestBranding: true}}} />
  </Main>

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
