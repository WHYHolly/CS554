import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import BerriesList from "./Berries/BerriesList";
import Berry from "./Berries/Berry";

class BerriesContainer extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/berries/page/:page" component={BerriesList} />
          <Route path="/berries/:id" component={Berry} />
          <Route render={() =>
               (
               <Redirect to="/PageNotFound" />
               )}/>
        </Switch>
      </div>
    );
  }
}

export default BerriesContainer;
