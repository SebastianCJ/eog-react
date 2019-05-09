import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Chart from "../components/Chart.js";
import * as actions from "../store/actions";

const styles = {
  grow: {
    flexGrow: 1
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    margin: '5% 5%',
  },
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

class ChartPage extends Component {

  componentDidMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.stopDroneSync();
  }

  render() {
    const { classes, temperatures, time, loading } = this.props;
    if(loading){
      return (
        <LinearProgress />
      )
    }
    return (
      <Card className={classes.card}>
        <CardHeader title="Graph Visualization" />
        <CardContent>
          <Chart temperatures={temperatures} time={time} />
        </CardContent>
      </Card>
    );
  }
};

const mapState = (state, ownProps) => {
  const {
    loading,
    data
  } = state.drone;
  return {
    loading,
    temperatures: data.map((drone) => {
      return drone.metric
    }),
    time: data.map((drone) => {
      var newDate = new Date(drone.timestamp);
      return newDate.toISOString().split("T")[0] + ' ' + newDate.toISOString().split("T")[1]
    }),
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

export default connect(mapState, mapDispatch)(withStyles(styles)(ChartPage));
