import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import get from 'lodash/get'

import prismic from '../../helpers/prismic'

import {
  fetchContent
} from './actions';

import LazyImage from 'lazyimage';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => dispatch(fetchContent())
}])

@connect(state => ({
  loading: state.homePage.loading,
  content: state.homePage.content
}))

export default class HomePage extends Component {

  render() {

    const {
      content
    } = this.props

    const {
      getParameter,
      getText,
      getImage,
      getHtml
    } = prismic(content)

    return (
      <div>

        <div>ID: {getParameter('id')}</div>

        <div>URI: {getParameter('uid')}</div>

        <div>Title: {getText('home.title')}</div>

        <LazyImage
          blurRadius={40}
          width={get(getImage('home.photo'), 'views.fullhd.width')}
          height={get(getImage('home.photo'), 'views.fullhd.height')}
          src={get(getImage('home.photo'), 'views.fullhd.url')}
          low={get(getImage('home.photo'), 'views.loading.url')}
        />

        <div dangerouslySetInnerHTML={{__html: getHtml('home.body')}}></div>

      </div>
    )

  }

}
