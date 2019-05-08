import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Map from '../Map';
import NowWhat from '../NowWhat';

const styles = {
  grow: {
    flexGrow: 1
  }
};

const MapPage = props => {
  const { classes } = props;

  return (
    <Grid container spacing={12}>

        <Grid item xs={8}>
        <Map />
        </Grid>

        <Grid item xs={4}>
        <NowWhat />
        </Grid>
    </Grid> 
  );
};

export default withStyles(styles)(MapPage);
