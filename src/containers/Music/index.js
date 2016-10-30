import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import get from 'lodash/get';

import { fetchContent } from './actions';

import Helmet from 'react-helmet';

import AppView from '../../components/AppView';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import ReleaseList from '../../components/ReleaseList';
import LiveList from '../../components/LiveList';
import VideosList from '../../components/VideosList';
import Image from '../../components/Image';

if (process.env.WEBPACK) require('./stylesheet.styl');

const tint = '#a0243d';

const Music = ({
  content: {
    title,
    body,
    image
  },
  releases,
  live,
  videos
}) =>

<AppView className='Music' tint={tint} title={title}>

  <Helmet meta={[{name: 'og:image', content: `${get(image, 'fields.file.url')}?fit=thumb&w=600&h=600`}]} />

  <Main>
    <Image alt={title} src={get(image, 'fields.file.url')} />
    {body &&
      <blockquote>
        {body.split("\n").map((line, index) =>
          <div key={index} style={{color: tint}}>{line}</div>
        )}
      </blockquote>
    }
  </Main>

  <Sidebar tint={tint} fade={true}>
    <article>
      {releases.length > 0 && <ReleaseList tint={tint} {...{releases}} />}
      {live.length > 0 && <LiveList tint={tint} {...{live}} />}
      {videos.length > 0 && <VideosList tint={tint} {...{videos}} />}
    </article>
  </Sidebar>

</AppView>

Music.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  content: React.PropTypes.object.isRequired,
  releases: React.PropTypes.array.isRequired,
  live: React.PropTypes.array.isRequired,
  videos: React.PropTypes.array.isRequired
};

const mapStateToProps = ({ music }) => ({
  loaded: music.loaded,
  content: music.content,
  releases: music.releases,
  live: music.live,
  videos: music.videos
});

export default asyncConnect(
  [{
    promise: ({ store: { dispatch } }) => dispatch(fetchContent())
  }],
  mapStateToProps
)(Music);
