import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import get from 'lodash/get'

import prismic from '../../helpers/prismic'

import { fetchContent } from './actions';

export default class Albums extends Component {

  render() {

    return (
      <div>This is the Albums container.</div>
    )

  }

}
