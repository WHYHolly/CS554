import React, { Component } from "react";
import logo from "./img/logo.svg";
import "./App.css";
import ErrorPage from "./components/ErrorPage";
import ListPhotos from "./components/ListPhotos";
import MyLikes from "./components/MyLikes";
import MyPhotos from "./components/MyPhotos";
import NewPost from "./components/NewPost";
import Popularity from "./components/Popularity";

import { BrowserRouter as Router, Route, Link, Redirect, Switch} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
            <img src={logo} width="100" height="42" alt="PokemonIcon"></img>
            <span className="sr-only">Icon</span>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav" role="navigation">
               <ul className="navbar-nav">
                  <li className="nav-item">
                     <Link className="nav-link" to="/">
                     Main Page
                     <span className="sr-only">Main Page</span>
                     </Link>
                     {/* <Link className="nav-link" to={{
                        pathname: "/",
                        pageNum: 1
                     }}>
                     Main Page
                     <span className="sr-only">Main Page</span>
                     </Link> */}
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/my-bin">
                     My Bin
                     <span className="sr-only">My Bin</span>
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/my-posts">
                     My Post
                     <span className="sr-only">My Post</span>
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/new-post">
                     New Post
                     <span className="sr-only">New Post</span>
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/my-top">
                     Popularity
                     <span className="sr-only">New Post</span>
                     </Link>
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
               <Route exact path="/" component={ListPhotos} />
               <Route path="/ErrorPage" component={ErrorPage}/>
               <Route path="/my-posts" component={MyPhotos} />
               <Route path="/my-bin" component={MyLikes} />
               <Route path="/new-post" component={NewPost} />
               <Route path="/my-top" component={Popularity} />
               <Route render={() =>
               (
               <Redirect to="/ErrorPage" />
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
