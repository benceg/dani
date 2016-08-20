import React, { Component } from 'react';
import { api } from 'prismic.io';

import logo from './logo.svg';
import './App.css';

import HomePage from './components/HomePage'

class App extends Component {

  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    api('https://daniellebooysen-test.prismic.io/api')
      .then(api => api.query('[[:d = at(document.type, "home")]]', {
          pageSize: 1,
          orderings: '[my.home.date desc]'
      }))
      .then(response => this.setState({posts: response.results}))
  }

  render() {
    const {
      posts
    } = this.state

    console.log(posts)

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          <HomePage content={(posts.length ? posts[0] : {})} />
        </ul>
      </div>
    );
  }

}

export default App;
