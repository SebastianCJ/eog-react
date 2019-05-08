import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";

const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});


const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

export class MapContainer extends Component {
  
  componentDidMount() {
    this.props.onLoad();
    console.log(this.props);
    /* 
    setTimeOut only for Dev purpouses
    */
    setTimeout(() =>{
      this.props.stopDroneSync();
    },5000);
  }

  componentWillUnmount() {
    console.log("Unmounting");
    this.props.stopDroneSync();
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.lastPosition)
    const { lastPosition, loading } = this.props;
    if ((loading || !lastPosition || !lastPosition.latitude || !lastPosition.longitude)) {
      return (
        <LinearProgress />
      )
    }
    return (
      <Card className={classes.card}>
        <CardHeader title="Map Visualization" />
        <CardContent className={classes.content}>
          <Map
            google={this.props.google}
            zoom={6}
            style={mapStyles}
            xs={12}
            initialCenter={{
            lat: lastPosition.latitude,
            lng: lastPosition.longitude
            }}  
          >
          <Marker
          position={{lat: lastPosition.latitude, lng: lastPosition.longitude}} />
      
          </Map>
        </CardContent>
    </Card>

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
  stopDroneSync: () =>
    dispatch({
      type: actions.SYNC_DRONE_CANCELLED
    }),
  onLoad: () =>
    dispatch({
      type: actions.FETCH_DRONE
    })
});

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: '80vh',
    margin: '5% 5%',
  },
  content: {
    flex: 1,
    position: 'relative',
    padding: '0px'
  }
};

export default withStyles(styles)(connect(
  mapState,
  mapDispatch
)(GoogleApiWrapper({
  apiKey: process.env.REACT_APP_APIKEY
})(MapContainer)));