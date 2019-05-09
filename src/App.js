import React from "react";
import createStore from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import MapPage from "./pages/MapPage";
import ChartPage from "./pages/ChartPage";
import Home from "./pages/Home";
import SideBar from "./components/SideBar";
import Grid from "@material-ui/core/Grid";


const store = createStore();
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "rgb(39,49,66)"
    },
    secondary: {
      main: "rgb(197,208,222)"
    },
    background: {
      main: "rgb(226,231,238)"
    }
  }
});

const App = props => (
  <MuiThemeProvider theme={theme}>
  <Router>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <Header />
        <Grid container style={{display: "flex", flex:'1'}}>

          <Grid item xs={2}>
            <SideBar />
          </Grid>

          <Grid item xs={10}>
              <Route path="/" exact component={Home} />
              <Route path="/map" exact component={MapPage} />
              <Route path="/chart" exact component={ChartPage} />
          </Grid>
          
        </Grid>
        <ToastContainer position="bottom-right"/>
      </Wrapper>
    </Provider>
    </Router>
  </MuiThemeProvider>
);

export default App;
