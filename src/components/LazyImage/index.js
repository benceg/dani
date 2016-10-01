import React, { Component } from 'react';

const transparentPNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAsCAQAAAB7o6ZJAAAAMUlEQVR42u3OMQEAAAwCoNm/9Cp4ekACcgMiISEhISEhISEhISEhISEhISEhISEh0XsZUAAtcGw+1gAAAABJRU5ErkJggg==';

if (process.env.WEBPACK) require('./stylesheet.styl');

class LazyImage extends Component {

  constructor() {
    super();
    this.state = {
      loadedSrc: false,
      supportsCSSFilters: false
    }
  }

  componentWillMount() {
    const { src } = this.props;
    const img = new Image();
  	img.onload = () => this.setState({ loadedSrc: true });
    img.src = src;
  }

  render() {

    const {
      src,
      width,
      height,
      title,
      alt,
      quality,
      className
    } = this.props;

    const {
      loadedSrc
    } = this.state;

    return (
      <div className='LazyImage'>

        <img {...{width, height}} className='loading' src={transparentPNG} style={{backgroundImage: `url(${src}?fit=thumb&w=12&h=8&q=100)`}} />

        {loadedSrc && <img key={`${src}${width}${height}${quality}`} {...{width, height, title, alt}} className={`loaded ${className}`} src={`${src}?fit=thumb&w=${width}&h=${height}&q=${quality}`} />}

      </div>
    )

  }

}

export default LazyImage;
