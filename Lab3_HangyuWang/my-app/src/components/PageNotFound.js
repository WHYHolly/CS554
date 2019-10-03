import React, { Component } from "react";
//import { Route, Switch } from "react-router-dom";
// import ShowList from "./ShowList";
// import Show from "./Show";

class PageNotFound extends Component {
  render() {
    return (
      <div className="container alert alert-warning">
        <p className="font-weight-bold">
          <strong>Sorry!</strong>
          <br />
          The page you are trying to locate is out of range or not valid.
          Please start a new one by click a new link.
        </p>
      </div>
    );
  }
}

export default PageNotFound;
