import React from 'react';
import find from 'lodash/find';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import { fetchContent } from './actions';

import formatDate from '../../helpers/formatDate';

import Helmet from 'react-helmet';

import AppView from '../../components/AppView';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import Map from '../../components/Map';

import routerLink from '../../helpers/routerLink';

if (process.env.WEBPACK) require('./stylesheet.styl');

const tint = '#69bd96';

const Live = ({
  title,
  venueLocation,
  venueName,
  accompaniment,
  otherActs,
  date
}) =>

<AppView className='Live' tint={tint} title={title || 'Live'}>

  {!title && <Helmet base={{href: '/404'}} />}

  <Main>
    <Map title={venueName} tint={tint} {...venueLocation} />
  </Main>

  <Sidebar tint={tint} fade={true}>
    <article>

      <h1>{title}</h1>
      <date dateTime={date}>{formatDate(date, 'MMMM Do, YYYY')}</date>

      <ul className='details'>

        <li>
          <label>Doors Open</label>
          <div>{formatDate(date, 'HH:mm', 'YYYY-MM-DDTHH:mm')}</div>
        </li>

        <li>
          <label>Venue</label>
          <div>{venueName}</div>
        </li>

        {accompaniment &&
          <li>
            <label>With</label>
            <div>
              <ul>
                {accompaniment.map(person =>
                  <li key={person}>{person}</li>
                )}
              </ul>
            </div>
          </li>
        }

        {otherActs &&
          <li>
            <label>Also Playing</label>
            <div>
              <ul>
                {otherActs.map(act =>
                  <li key={act}>{act}</li>
                )}
              </ul>
            </div>
          </li>
        }

      </ul>

    </article>
  </Sidebar>

</AppView>

Live.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
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
