import React, { Component } from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect';

import {
  fetchContent
} from './actions'

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => dispatch(fetchContent())
  // {
    // const promises = [];
    // if (!getState().homePage.loaded) promises.push(dispatch(fetchContent()));
    // return Promise.all(promises);
    // dispatch(fetchContent())
  // }
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

    const title = content.getText('home.title')
    const body = content.getHtml('home.body')
    const thumbnail = content.getImage('home.photo').views.small.url
    const photo = content.getImage('home.photo').main.url

    return (
      <li key={content.id}>
        <div>Title: {title}</div>
        <div>Thumbnail: {thumbnail}</div>
        <div>Photo: {photo}</div>
        <div dangerouslySetInnerHTML={{__html: body}}></div>
      </li>
    )
  }

}
