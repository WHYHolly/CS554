import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MachinesList from "./Machines/MachinesList";
import Machine from "./Machines/Machine";

class MachinesContainer extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/machines/page/:page" component={MachinesList} />
          <Route path="/machines/:id" component={Machine} />
          <Route render={() =>
               (
               <Redirect to="/PageNotFound" />
               )}/>
        </Switch>
      </div>
    );
  }
}

export default MachinesContainer;
