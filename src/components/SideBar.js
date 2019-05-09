import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Card from "@material-ui/core/Card";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import { withStyles } from "@material-ui/core/styles";
import { NavLink  } from 'react-router-dom';
import MapIcon from '@material-ui/icons/Map';
import HomeIcon from '@material-ui/icons/Home';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '93vh',
    width: '100%',
    paddingTop: '10px',
    backgroundColor: '#3893ca',
    [theme.breakpoints.down('sm')]: {
      width: "7vh",
    }
  },
  link: {
    textDecoration: 'none'
  },
  selected: {
    color: "#FFF",
  },
  unSelected: {
    color: "#000",
    [theme.breakpoints.down('sm')]: {
      textAlign: "center",
    }
  },
  selectedTxt: {
    color: "#FFF",
    [theme.breakpoints.down('sm')]: {
      display: "none",
    }
  },
  unSelectedTxt: {
    color: "#000",
    [theme.breakpoints.down('sm')]: {
      display: "none",
    }
  }
});

const StyledListItem = withStyles({
  root: {
    backgroundColor: "##3893ca",
    "&$selected": {
      backgroundColor: "#273142"
    },
  },
  selected: {}
})(ListItem);

class SideBar extends Component  {

  constructor(props){
    super(props);

    this.state = {
      menu: [
        { index: 0, name: "Home", path: "/"},
        { index: 1, name: "Visualize Map", path: "/map"},
        { index: 2, name: "Visualize Chart", path: "/chart"},
      ]
    }

  }

  render(){
    const { classes, updateSelected, selectedMenuIndex } = this.props;
    const {  menu } = this.state;
    return (
      <Card className={classes.card}>
          <List component="nav">
            {menu.map((item, index) => 
            <Fragment key={index}>
              <Divider />
                <NavLink  
                  to={item.path}
                  className={classes.link}
                >
                  <StyledListItem button className={classes.listItem} onClick={() => updateSelected(item.index)} selected={selectedMenuIndex === item.index}>
                      <ListItemIcon className={selectedMenuIndex === item.index ? classes.selected : classes.unSelected}> 
                        {item.name === 'Home' ? <HomeIcon /> : item.name === 'Visualize Map' ? <MapIcon /> : <InsertChartIcon /> }
                      </ListItemIcon>

                      <Typography className={selectedMenuIndex === item.index ? classes.selectedTxt : classes.unSelectedTxt}  variant="h6" >
                          {item.name}
                      </Typography>

                  </StyledListItem>
                </NavLink >
              <Divider />
            </Fragment>
            )}
          </List>
      </Card>
    );
  }
};

const mapState = (state) => {
  const {
    selectedMenuIndex,
  } = state.ui;
  return {
    selectedMenuIndex
  };
};

const mapDispatch = dispatch => ({
  updateSelected: (menuIndex) =>
    dispatch({
      type: actions.SELECT_MENU, menuIndex
    })
});

export default connect(mapState, mapDispatch)(withStyles(styles)(SideBar));
