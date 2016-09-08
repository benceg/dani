import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import get from 'lodash/get'

import { fetchContent } from './actions';

import AppView from '../../components/AppView';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import Album from '../../components/Album';

if (process.env.WEBPACK) require('./stylesheet.styl');

const tint = '#ad3243';

const Releases = ({
  content
}) =>

<AppView className='Releases' tint={tint}>

  <Main>
    <ul>
      {content.map(item => <Album key={item.slug} {...item} />)}
    </ul>
  </Main>

  <Sidebar tint={tint}>
    Something!
  </Sidebar>

</AppView>

Releases.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  content: React.PropTypes.array.isRequired
};

const mapStateToProps = ({ releases }) => ({
  loaded: releases.loaded,
  content: releases.content
});

export default asyncConnect(
  [{
    promise: ({ store: { dispatch } }) => dispatch(fetchContent())
  }],
  mapStateToProps
)(Releases);
