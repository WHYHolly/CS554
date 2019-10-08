import React, { Component } from "react";
import logo from "./img/Pokemon.svg";
import "./App.css";
import MainPage from "./components/MainPage";
import PokemonContainer from "./components/PokemonContainer";
import BerriesContainer from "./components/BerriesContainer";
import MachinesContainer from "./components/MachinesContainer";
import PageNotFound from "./components/PageNotFound";

import { BrowserRouter as Router, Route, Link, Redirect, Switch} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
            <img src={logo} width="100" height="42" alt="PokemonIcon"></img>
            <span className="sr-only">PokemonIcon</span>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav">
                  <li className="nav-item">
                     <Link className="nav-link" to="/pokemon/page/0">
                     Pokemon</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/berries/page/0">
                     Berries</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/machines/page/0">
                     Machines</Link>
                  </li>
               </ul>
            </div>
         </nav>
         <br />
         <br />
         <div className="App-body">
            {/* 
            <p>Welcome to the Pokemon's world</p>
            */}
            <Switch>
               <Route exact path="/" component={MainPage} />
               <Route path="/pokemon/" component={PokemonContainer} />
               <Route path="/berries/" component={BerriesContainer} />
               <Route path="/machines/" component={MachinesContainer} />
               <Route path="/PageNotFound" component={PageNotFound}/>
               <Route render={() =>
               (
               <Redirect to="/PageNotFound" />
               )}/>
            </Switch>
         </div>
         <footer className="footer">
            <div>Author: Hangyu Wang</div>
         </footer>
      </div>
      </Router>

    );
  }
}

export default App;
