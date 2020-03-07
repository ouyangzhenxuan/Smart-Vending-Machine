import React, { Component } from 'react';
import { Map, Marker, InfoWindow,GoogleApiWrapper } from 'google-maps-react';
const mapStyles = {
  width: '94%',
  height: '100%'
};

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {}
        }
        // binding this to event-handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
      }

      onMarkerClick = (props, marker, e) => {
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
      }
      onMapClick = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          });
        }
      }
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        onClick = { this.onMapClick }
        options={{streetViewControl: true}}
        initialCenter={{
         lat: 32.845158,
         lng: -96.768737
        }}
      >
        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Changing Colors Garage' }
          position = {{ lat: 32.845158, lng: -96.768737}}
          name = { 'Changing Colors Garage' }
        />
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          <div>
              98G Albe Dr Newark, DE 19702 <br />
              302-293-8627
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  //apiKey: 'YOUR_GOOGLE_API_KEY_GOES_HERE'
})(MapContainer);