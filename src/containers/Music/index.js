import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import get from 'lodash/get'

import { fetchContent } from './actions';

import AppView from '../../components/AppView';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import Releases from '../../components/Releases';
import Live from '../../components/Live';

if (process.env.WEBPACK) require('./stylesheet.styl');

const tint = '#81072b';

const Music = ({
  content: {
    title,
    body,
    image
  },
  releases,
  live
}) =>

<AppView className='Music' tint={tint} title={title}>

  <Main>

    <img src={`${get(image, 'fields.file.url')}?w=1920&h=1080`} />

    {body &&
      <blockquote>
        {body.split("\n").map((line, index) =>
          <div key={index} style={{backgroundColor: tint}}>{line}</div>
        )}
      </blockquote>
    }

  </Main>

  <Sidebar tint={tint}>

    <article>

      {releases.length &&
        <section className='releases'>
          <h2>Releases</h2>
          <Releases {...{releases}} />
        </section>
      }

      {live.length &&
        <section className='live'>
          <h2>Live</h2>
          <Live {...{live}} />
        </section>
      }

    </article>

  </Sidebar>

</AppView>

Music.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  content: React.PropTypes.object.isRequired,
  releases: React.PropTypes.array.isRequired,
  live: React.PropTypes.array.isRequired
};

const mapStateToProps = ({ music }) => ({
  loaded: music.loaded,
  content: music.content,
  releases: music.releases,
  live: music.live
});

export default asyncConnect(
  [{
    promise: ({ store: { dispatch } }) => dispatch(fetchContent())
  }],
  mapStateToProps
)(Music);
