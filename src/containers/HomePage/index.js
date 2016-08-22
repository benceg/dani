import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import {
  get
} from 'lodash'

import prismic from '../../helpers/prismic'

import {
  fetchContent
} from './actions';

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
        <div>Thumbnail: <img src={get(getImage('home.photo'), 'views.small.url')} /></div>
        <div>Photo: <img src={get(getImage('home.photo'), 'main.url')} /></div>
        <div dangerouslySetInnerHTML={{__html: getHtml('home.body')}}></div>
      </div>
    )

  }

}
