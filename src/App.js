import React, { Component } from 'react';
import { api, Predicates } from 'prismic.io';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    api('https://daniellebooysen-test.prismic.io/api')
      .then(api => api.query(Predicates.at('document.type', 'albums')))
      // .then(api => api.query(Predicates.at('my.albums.uid', 'new-story')))
      .then(response => this.setState({posts: response.results}));
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
          {posts.map(post =>
            <li key={post.id}>{post.getText('albums.title')}</li>
          )}
        </ul>
      </div>
    );
  }

}

export default App;
