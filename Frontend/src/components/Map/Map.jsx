import  { PureComponent } from 'react';
import PropTypes from 'prop-types';
//import { Test } from './Map.styles';

import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker/Marker'
import InfoWindow from 'google-maps-react'

import './Marker.css';


const getMapOptions = (maps: any) => {
  return {
    disableDefaultUI: true,
    mapTypeControl: true,
    streetViewControl: true,
    styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
  };
};


// const Marker = (props: any) => {
//     const { color, name, id } = props;
//     return (
//       <div className="marker"
//         style={{ backgroundColor: color, cursor: 'pointer'}}
//         title={name}
//       />
//     );
//   };


class Map extends PureComponent { 
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  states = {
    showingInfoWindow: false,  
    activeMarker: {},        
    selectedPlace: {}  
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onClose = props => {
      if (this.states.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };

  componentWillMount = () => {
    console.log('Map will mount');
  }

  componentDidMount = () => {
    console.log('Map mounted');
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('Map will receive props', nextProps);
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.log('Map will update', nextProps, nextState);
  }

  componentDidUpdate = () => {
    console.log('Map did update');
  }

  componentWillUnmount = () => {
    console.log('Map will unmount');
  }

  

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="MapWrapper">
<div style={{ height: '52vh', width: '100%' }}>
      <GoogleMapReact
        //bootstrapURLKeys={{ key: 'AIzaSyDxNRHpwkUKhYVH3lc4UGN-Zu2OTKZNKqU' }}
        defaultCenter={({lat: 32.845158, lng: -96.768737 })}
        defaultZoom={(16)}
        options={getMapOptions}
      >
        <Marker
          lat={32.845158}
          lng={-96.768737}
          text="My Marker"
          name={'Kenyatta International Convention Centre'}
        />
        <InfoWindow
        >
          <div>
            <h4>{this.states.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </GoogleMapReact>
    </div>
      </div>
    );
  }
}

Map.propTypes = {
  // bla: PropTypes.string,
};

Map.defaultProps = {
  // bla: 'test',
};

export default Map;
