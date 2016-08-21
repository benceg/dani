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
      id,
      title,
      body,
      thumbnail,
      photo
    } = this.props.content

    return (
      <div>
        <div>ID: {id}</div>
        <div>Title: {title}</div>
        <div>Thumbnail: <img src={thumbnail} /></div>
        <div>Photo: <img src={photo} /></div>
        <div dangerouslySetInnerHTML={{__html: body}}></div>
      </div>
    )
  }

}
