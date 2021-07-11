import axios from "axios";
import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { Grid, Card, Input, Button } from "semantic-ui-react";
import ReactPaginate from "react-paginate";

class CardData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataCari: "",
      pageCount: 0,
      offset: 0,
      perPage: 9,
      currentpage: 0
    };
  }

  getData = async () => {
    try {
      await axios
        .get(`https://jsonplaceholder.typicode.com/posts`)
        .then((res) => {
          let dataRes = res.data;
          let dataResSlice = res.data.slice(this.state.offset, this.state.perPage + this.state.offset);
          this.setState({
            data: dataResSlice,
            pageCount: Math.ceil(dataRes.length / this.state.perPage),
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      dataCari: e.target.value,
    });
  };

  handleChangeSubmit = async () => {
    try {
      if (this.state.dataCari === "") {
        await axios
          .get(`https://jsonplaceholder.typicode.com/posts`)
          .then((res) => {
            this.setState({
              data: res.data,
            });
          });
      } else {
        await axios
          .get(`https://jsonplaceholder.typicode.com/posts`)
          .then((res) => {
            this.setState({
              data: res.data.filter((res) => res.title === this.state.dataCari),
            });
          });
      }
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  handlePageClick = (e) => {
    let selected = e.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState(
        { 
            offset: offset,
            currentpage: selected
        }, () => {
      this.getData();
    });
  };


  componentDidMount = () => {
    this.getData();
  };

  render() {
    return (
      <div>
        <Grid container>
          <Grid.Column textAlign="right">
            <Input
              icon="search"
              placeholder="Search..."
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            <Button
              primary
              style={{ marginLeft: "20px" }}
              onClick={this.handleChangeSubmit}
            >
              Cari
            </Button>
          </Grid.Column>
        </Grid>
        <Grid container columns={3}>
          {this.state.data.map((data, index) => {
            return (
              <Grid.Column key={index}>
                <Card.Group centered>
                  <Card>
                    <Card.Content>
                      <Card.Header>{data.title}</Card.Header>
                      <Card.Description>{data.body}</Card.Description>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Grid.Column>
            );
          })}
        </Grid>

        <Grid container textAlign="center" style={{marginTop: '50px'}}>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
        </Grid>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getData: () => {
      const action = { type: "GET_DATA" };
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(CardData);
