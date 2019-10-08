import React, { Component } from "react";
import { Route } from "react-router-dom";
// import ShowList from "./ShowList";
// import Show from "./Show";

function Status({ code, children }) {
  console.log(code);
  // console.log(staticContext.status);
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) staticContext.status = code;
        // console.log(staticContext.status);
        return children;
      }}
    />
  );
}

class PageNotFound extends Component {
  render() {
    return (
      <Status code={404}>
      <div className="container alert alert-warning">
        <p className="font-weight-bold">
          <strong>404 Sorry! 404</strong>
          <br />
          The page you are trying to locate is out of range or not valid.
          Please start a new one by click a new link.
        </p>
      </div>
      </Status>
    );
  }
}

export default PageNotFound;
