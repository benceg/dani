import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import get from 'lodash/get'

import { fetchContent } from './actions';

import AppView from '../../components/AppView';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import Releases from '../../components/Releases';
import Live from '../../components/Live';

if (process.env.WEBPACK) require('./stylesheet.styl');

const tint = '#ad3243';

const Music = ({
  releases,
  live
}) =>

<AppView className='Music' tint={tint} title='Music'>

  <Main>
    <h1>Music</h1>
    <h2>Releases</h2>
    {live.length && <Live {...{live}} />}
    <h2>Live</h2>
    {releases.length && <Releases {...{releases}} />}
  </Main>

  <Sidebar tint={tint}>
    Music Blurb.
  </Sidebar>

</AppView>

Music.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  releases: React.PropTypes.array.isRequired,
  live: React.PropTypes.array.isRequired
};

const mapStateToProps = ({ music }) => ({
  loaded: music.loaded,
  releases: music.releases,
  live: music.live
});

export default asyncConnect(
  [{
    promise: ({ store: { dispatch } }) => dispatch(fetchContent())
  }],
  mapStateToProps
)(Music);
