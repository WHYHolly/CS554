import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PokemonList from "./Pokemon/PokemonList";
import Pokemon from "./Pokemon/Pokemon";

class PokemonContainer extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/pokemon/page/:page" component={PokemonList} />
          <Route path="/pokemon/:id" component={Pokemon} />
        </Switch>
      </div>
    );
  }
}

export default PokemonContainer;
