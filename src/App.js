import "./App.css";
import CardData from "./CardData";
import store from "./store/";
import "semantic-ui-css/semantic.min.css";
import { Grid, Header } from "semantic-ui-react";
import { Component } from "react";
import HeaderComponent from "./components/HeaderComponent";


class App extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
      <Grid container>
        <CardData store={store}></CardData>
      </Grid>
    </div>
    );
  }
}

export default App;
