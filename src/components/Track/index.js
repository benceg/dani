import React, { Component } from 'react';
import get from 'lodash/get';
import formatDuration from 'format-duration';

if (process.env.WEBPACK) require('./stylesheet.styl');

class Track extends Component {

  constructor() {
    super();
    this.timeUpdate = this.timeUpdate.bind(this);
    this.setDuration = this.setDuration.bind(this);
    this.state = {
      playing: false,
      hasPlayedOnce: false,
      duration: '0:00',
      elapsed: '0:00'
    };
  }

  componentDidMount() {
    if (this.audio) {
      this.audio.addEventListener('timeupdate', this.timeUpdate);
      this.audio.addEventListener('loadedmetadata', this.setDuration);
    }
  }

  setDuration(e) {
    this.setState({
      duration: formatDuration(Math.floor(e.target.duration) * 1000)
    });
  }

  componentWillUnmount() {
    if (this.audio) {
      this.audio.removeEventListener('timeupdate', this.timeUpdate);
      this.audio.removeEventListener('loadedmetadata', this.setDuration);
    }
  }

  timeUpdate(e) {
    this.setState({
      elapsed: formatDuration(Math.floor(e.target.currentTime) * 1000)
    });
  }

  rewindTrack() {
    this.audio.currentTime = 0;
  }

  playTrack() {
    this.audio.play();
    this.setState({
      playing: true,
      hasPlayedOnce: true
    });
  }

  pauseTrack() {
    this.audio.pause();
    this.setState({
      playing: false
    });
  }

  render() {

    const {
      title,
      ...fields
    } = this.props;

    const {
      playing,
      hasPlayedOnce,
      elapsed,
      duration
    } = this.state;

    const track = get(fields, 'audio.fields.file.url');
    const type = get(fields, 'audio.fields.file.contentType');
    const toggleTitle = (playing ? 'Pause' : 'Play');

    return (
      <div className='Track'>

        <h4>{title}</h4>

        {track &&
          <div className='audio'>

            <span className='duration'>
              {(hasPlayedOnce ? `${elapsed}/${duration}` : `${duration}`)}
            </span>

            <span className={`toggle icon-rewind`} onClick={() => this.rewindTrack()}>
              Rewind
            </span>

            <span className={`toggle icon-${toggleTitle.toLowerCase()}`} onClick={() => (playing ? this.pauseTrack() : this.playTrack())}>
              {toggleTitle}
            </span>

            <audio ref={(el) => this.audio = el}>
              <source src={track} type={type} />
            </audio>

          </div>
        }

      </div>
    )

  }

}

Track.propTypes = {
  title: React.PropTypes.string.isRequired,
  fields: React.PropTypes.object
}

export default Track;
