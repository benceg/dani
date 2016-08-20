import React from 'react'

export default function Image(props) {

  const {
    src,
    thumb,
    alt
  } = props

  return (
    <img src={thumb} onLoad={() => this.src = src} alt={alt} />
  )

}

Image.propTypes = {
  src: React.PropTypes.string.isRequired,
  thumb: React.PropTypes.string.isRequired,
  thumb: React.PropTypes.string.isRequired
}
