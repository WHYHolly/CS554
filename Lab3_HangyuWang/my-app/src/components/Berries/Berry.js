import React, { Component } from "react";
import axios from "axios";

class Berry extends Component {
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
        `https://pokeapi.co/api/v2/berry/${this.props.match.params.id}`
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

    const flaArray = data.flavors.map((data, i) => {
      return <li key={i}>Flavor: {data.flavor.name} ===> Potency: {data.potency}</li>
    });

    return (
      <article className = "container">
          <h1>{data.name}</h1>
          <h2>Firmness:</h2>
          <ul><li>{data.firmness.name}</li></ul>
          <h2>Flavors:</h2>
          <ul>{flaArray}</ul>
          <h2>Growth Time: </h2>
          <ul><li>{data.growth_time}</li></ul>
          <h2>Item:</h2>
          <ul><li>{data.item.name}</li></ul>
          <h2>Max Harvest:</h2>
          <ul><li>{data.max_harvest}</li></ul>
          <h2>Natural Gift Power:</h2>
          <ul><li>{data.natural_gift_power}</li></ul>
          <h2>Natural Gift Type:</h2>
          <ul><li>{data.natural_gift_type.name}</li></ul>
          <h2>Size:</h2>
          <ul><li>{data.size}</li></ul>
          <h2>Smoothness:</h2>
          <ul><li>{data.smoothness}</li></ul>
          <h2>Soil Dryness:</h2>
          <ul><li>{data.soil_dryness}</li></ul>
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

export default Berry;
