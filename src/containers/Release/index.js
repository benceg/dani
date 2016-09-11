import React from 'react';
import find from 'lodash/find';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import color from 'color';

import { push } from 'react-router-redux';

import { fetchContent } from './actions';

import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';

import AppView from '../../components/AppView';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';

if (process.env.WEBPACK) require('./stylesheet.styl');

const tint = '#ad3243';

const Release = ({
  title,
  slug,
  blurb,
  images,
  colour,
  releaseDate,
  tracklist
}) =>

<AppView className='Release' tint={colour || tint} title='Release'>

  {!title && <Helmet base={{"href": "/404"}} />}

  <Helmet htmlAttributes={{'data-theme': (color(colour).dark() ? 'dark' : 'light')}} />

  <Main>
    <article>
      <h1>{title}</h1>
      <section>
        <ReactMarkdown source={blurb || ''} escapeHtml={true} />
      </section>
    </article>
  </Main>

  <Sidebar tint={tint}>
    <ul className='tracklist'>
      {tracklist && tracklist.map((track, index) =>
        <li key={index + track}>{index + 1}. {track}</li>
      )}
    </ul>
  </Sidebar>

</AppView>

Release.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  slug: React.PropTypes.string.isRequired,
  releaseDate: React.PropTypes.string.isRequired,
  blurb: React.PropTypes.string,
  images: React.PropTypes.array,
  tracklist: React.PropTypes.array,
  colour: React.PropTypes.string
};

const mapStateToProps = ({ music }, { params }) => {
  const release = find(music.releases, {slug: params.release});
  return {
    loaded: music.loaded,
    ...release
  }
};

export default asyncConnect(
  [{
    promise: ({ store: { dispatch }, params: { release } }) => dispatch(fetchContent(release))
  }],
  mapStateToProps
)(Release);
