import "./App.css";
import CardData from "./CardData";
import store from "./store/";
import "semantic-ui-css/semantic.min.css";
import { Grid, Header } from "semantic-ui-react";
import { Component } from "react";

// function App() {
//   return (
//     <div>
//       <Grid container>
//         <Header as="h2">Aplikasi Penampil Data</Header>
//         <CardData store={store}></CardData>
//       </Grid>
//     </div>
//   );
// }

class App extends Component {
  render() {
    return (
      <div>
        <Grid container  textAlign="center">
        <Header as="h1"  style={{marginTop: "50px", marginBottom: "50px"}}>Aplikasi Penampil Data</Header>
        </Grid>
      <Grid container>
        <CardData store={store}></CardData>
      </Grid>
    </div>
    );
  }
}

export default App;
