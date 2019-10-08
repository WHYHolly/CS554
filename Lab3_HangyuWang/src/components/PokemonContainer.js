import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PokemonList from "./Pokemon/PokemonList";
import Pokemon from "./Pokemon/Pokemon";

class PokemonContainer extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/pokemon/page/:page" component={PokemonList} />
          <Route path="/pokemon/:id" component={Pokemon} />
          <Route render={() =>
               (
               <Redirect to="/PageNotFound" />
               )}/>
        </Switch>
      </div>
    );
  }
}

export default PokemonContainer;
