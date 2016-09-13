import React from 'react';
import find from 'lodash/find';
import get from 'lodash/get';
import head from 'lodash/head';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Color from 'color';

import { push } from 'react-router-redux';

import { fetchContent } from './actions';

import formatDate from '../../helpers/formatDate';

import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';

import AppView from '../../components/AppView';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import Track from '../../components/Track';

import routerLink from '../../helpers/routerLink';

if (process.env.WEBPACK) require('./stylesheet.styl');

const tint = '#ad3243';

const Release = ({
  title,
  blurb,
  images,
  colour,
  releaseDate,
  tracklist
}) =>

<AppView className='Release' tint={colour || tint} title={title || Release}>

  {!title && <Helmet base={{href: '/404'}} />}

  <Helmet
    htmlAttributes={{'data-theme': (Color(colour).dark() ? 'dark' : 'light')}}
    style={[
      {cssText: `.tracklist li:before { color: ${colour || tint}; }`}
    ]}
  />

  <Main>
    <img src={`${get(head(images), 'fields.file.url')}?w=1920&h=1080&q=85`} />
  </Main>

  <Sidebar tint={colour || tint} fade={true}>
    <article>
      <h1>{title}</h1>
      <date dateTime={releaseDate}>{formatDate(releaseDate, 'MMMM Do, YYYY')}</date>
      <ol className='tracklist'>
        {tracklist && tracklist.map(({ sys: { id }, fields }) =>
          <li key={id}>
            <Track {...fields} />
          </li>
        )}
      </ol>
      <section>
        <ReactMarkdown source={blurb || ''} escapeHtml={true} renderers={{Link: routerLink}} />
      </section>
    </article>
  </Sidebar>

</AppView>

Release.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
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
