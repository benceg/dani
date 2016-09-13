import React from 'react';

import GoogleMap from 'google-map-react';

import Marker from '../Marker';

import styles from './styles.json';

if (process.env.WEBPACK) require('./stylesheet.styl');

const Map = ({
  title,
  lat,
  lon,
  tint
}) =>

<div className='Map'>
  <GoogleMap defaultCenter={[lat, lon]} defaultZoom={17} bootstrapURLKeys={{key: 'AIzaSyBgB2FjrowoXKs4AjgBHkub9KVF3cq4xGU'}} options={{styles}}>
    <Marker lat={lat} lng={lon} title={title} tint={tint} />
  </GoogleMap>
</div>

Map.propTypes = {
  title: React.PropTypes.string.isRequired,
  lat: React.PropTypes.number.isRequired,
  lon: React.PropTypes.number.isRequired
};

export default Map;
