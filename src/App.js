import "./App.css";
import store from "./store/";
import "semantic-ui-css/semantic.min.css";
import { } from "semantic-ui-react";
import { Component } from "react";
import HeaderComponent from "./components/HeaderComponent";
import CardComponent from "./components/CardComponent";


class App extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        <CardComponent store={store} />
    </div>
    );
  }
}

export default App;
