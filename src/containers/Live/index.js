import React from 'react';
import find from 'lodash/find';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import color from 'color';

import { push } from 'react-router-redux';

import { fetchContent } from './actions';

import formatDate from '../../helpers/formatDate';

import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';

import AppView from '../../components/AppView';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import Map from '../../components/Map';

if (process.env.WEBPACK) require('./stylesheet.styl');

const tint = '#69bd96';

const Live = ({
  title,
  venueLocation,
  venueName,
  date,
  slug
}) =>

<AppView className='Live' tint={tint} title={title || 'Live'}>

  {!title && <Helmet base={{"href": "/404"}} />}

  <Main>
    <Map title={venueName} {...venueLocation} />
  </Main>

  <Sidebar tint={tint} fade={true}>
    <article>
      <h1>{title}</h1>
      <date dateTime={date}>{formatDate(date, 'MMMM Do, YYYY')}</date>
      {/* <section>
        <ReactMarkdown source={blurb || ''} escapeHtml={true} />
      </section> */}
    </article>
  </Sidebar>

</AppView>

Live.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  slug: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired
};

const mapStateToProps = ({ music }, { params }) => {
  const live = find(music.live, {slug: params.gig});
  return {
    loaded: music.loaded,
    ...live
  }
};

export default asyncConnect(
  [{
    promise: ({ store: { dispatch }, params: { gig } }) => dispatch(fetchContent(gig))
  }],
  mapStateToProps
)(Live);
