import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  
  componentDidMount() {
    this.props.onLoad();
    console.log(this.props);
  }

  render() {
    console.log(this.props.lastPosition)
    const { lastPosition, loading } = this.props;
    if ((loading || !lastPosition || !lastPosition.latitude || !lastPosition.longitude)) {
      return (
        <div>
          Loading
        </div>
      )
    }
    return (
      <Map
      google={this.props.google}
      zoom={6}
      style={mapStyles}
      initialCenter={{
       lat: lastPosition.latitude,
       lng: lastPosition.longitude
      }}  
    >
      <Marker
      position={{lat: lastPosition.latitude, lng: lastPosition.longitude}} />
   
    </Map>
    );
  }
}

const mapState = (state, ownProps) => {
  const {
    loading,
    data
  } = state.drone;
  console.log(data);
  return {
    loading,
    lastPosition: data[data.length-1]
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_DRONE
    })
});

export default connect(
  mapState,
  mapDispatch
)(GoogleApiWrapper({
  apiKey: process.env.REACT_APP_APIKEY
})(MapContainer));