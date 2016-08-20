import React, { Component } from 'react';
import { api } from 'prismic.io';

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
        <HomePage content={(posts.length ? posts[0] : {})} />
      </div>
    );
  }

}

export default App;
