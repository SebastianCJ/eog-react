import React from "react";
import NowWhat from "../components/NowWhat";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  grow: {
    flexGrow: 1
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: '5% 5%',
  },
};



const Home = props => {

  return (
    <NowWhat />
  );
};

export default withStyles(styles)(Home);
