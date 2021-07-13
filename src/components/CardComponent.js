import "./card.css";
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { Grid, Input, Button } from "semantic-ui-react";
import ReactPaginate from "react-paginate";
import { Container, Row, Card, CardColumns } from 'react-bootstrap';

class CardComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataCari: "",
        pageCount: 0,
        offset: 0,
        perPage: 9,
        currentpage: 0,
      };
    }
  
    handlePageClick = (e) => {
      let selected = e.selected;
      let offset = Math.ceil(selected * this.state.perPage);
  
      this.setState({
        offset: offset,
        currentpage: selected,
      });
  
      console.log(this.state.offset);
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
          await this.setState({
            dataSlice: this.props.data
          });
        } else {
          await this.setState({
            dataSlice: this.props.data.filter(
              (res) => res.title === this.state.dataCari
            ),
          });
        }
      } catch (error) {
        alert(JSON.stringify(error.message));
      }
    };
  
    componentDidMount = () => {
      this.props.getData();
  
      this.setState({
          pageCount: Math.ceil(this.props.data.length / this.state.perPage),
      });
    };

    render() {
      const data = this.props.data;
      const sliced = data.slice(this.state.offset, this.state.perPage + this.state.offset);
  
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
          
          <Container className="mt-5">
            <Row>
            <CardColumns>
            {sliced.filter((data) => {
              if (this.state.dataCari === "") {
                return data
              } else if (data.title.toLowerCase().includes(this.state.dataCari.toLowerCase())) {
                return data
              }
            }).map((data, index) => {
              return (
                <Card key={index}>
                  <Card.Body>
                    <Card.Title><b>{data.title}</b></Card.Title>
                    <hr />
                    <Card.Text>{data.body}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
              </CardColumns>
            </Row>
          </Container>
  
          <Grid container textAlign="center" style={{ marginTop: "50px" }}>
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
      getData: async () => {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
        const action = { type: "GET_DATA", payload: res.data };
        dispatch(action);
      },
    };
  };
  
  export default connect(mapState, mapDispatch)(CardComponent);
