import React, { Component } from "react";
import axios from "axios";

class Machine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false
    };
  }

  componentWillMount() {
    this.getShow();
  }

  async getShow() {
    this.setState({
      loading: true
    });
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/machine/${this.props.match.params.id}`
      );
      this.setState({
        data: response.data,
        loading: false
      });
    } catch (e) {
      window.location.assign("http://localhost:3000/PageNotFound");
    }
  }

  formateData(data) {
    if (!data) {
        return "No Data";
    }
    
    return (
        <article className="container">
            <h1>Machine with ID{data.id}</h1>

            <h2>Item:</h2>
            <ul><li>{data.item.name}</li></ul>
 
            <h2>Move:</h2>
            <ul><li>{data.move.name}</li></ul>

            <h2>Version Group:</h2>
            <ul><li>{data.version_group.name}</li></ul>
            <br />
            <br />
            <br />
            <br />
        </article>
    );
}

  render() {
    let body = null;

    if (this.state.loading) {
      body = (
          <div className="App-body">
              <h1>Loading</h1>
          </div>
      );
    } else {
      body = (
          <div className="App-body">
              {this.formateData(this.state.data)}
          </div>
      );
    }
    return body;
  }
}

export default Machine;
