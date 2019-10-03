import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class BerriesList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      prev: undefined,
      cur: undefined,
      next: undefined,
      total: undefined,
      loading: false
    };
  }

  NumberFilter(cur_in){
    let isnum = /^\d+$/.test(cur_in);
    //let cur;
    if(isnum){
      //cur = parseInt(cur_in);
      return parseInt(cur_in);
    }else{
      window.location.assign("http://localhost:3000/PageNotFound");
    }

  }

  async getShows() {
    try {
      
      let Offset = this.NumberFilter(this.props.match.params.page);

      console.log("Here the offset: "+Offset);
      const response = await axios.get(`https://pokeapi.co/api/v2/berry/?offset=${Offset*20}&limit=20`);
      console.log(response.data.count);
      
      this.setState({ 
        data: response.data.results,
        cur: Offset,
        prev: response.data.previous,
        next: response.data.next,
        total: response.data.count
      });
    } catch (e) {
      window.location.assign("http://localhost:3000/PageNotFound");
      console.log(e);
    }
  }

  componentDidMount() {
    // this.CurPageUpdate();
    this.getShows();
  }

  componentDidUpdate(){
    let cur = this.NumberFilter(this.props.match.params.page);
    let former = this.state.cur;

    if (cur === former) {
      return;
    } else {
      this.getShows();
    }
  }

  pagecontrol() {
    let cur_page = this.NumberFilter(this.props.match.params.page);
 
    let prev_page = cur_page-1;
    let nxt_page = cur_page+1;
    console.log(cur_page);
    console.log(this.cur_page);
    if(cur_page<0 || cur_page>this.state.total/20){
      window.location.assign("http://localhost:3000/PageNotFound");
    }
    if(this.state.next!=null && this.state.prev!=null){
      return(
///////////////////////
        <nav aria-label="Page navigation example">
          <ul className="pagination pagination-lg justify-content-center">
            <li className="page-item">
            <Link className="page-link" to={"/berries/page/" + prev_page}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </Link>
            </li>
            <li className="page-item">
            <Link className="page-link" to={"/berries/page/0"}>
              <span aria-hidden="true">1</span>
              <span className="sr-only">First</span>
            </Link>
            </li>
            <li className="page-item">
            <Link className="page-link" to={"/berries/page/1"}>
              <span aria-hidden="true">2</span>
              <span className="sr-only">Second</span>
            </Link>
            </li>
            <li className="page-item">
            <Link className="page-link" to={"/berries/page/2"}>
              <span aria-hidden="true">3</span>
              <span className="sr-only">Third</span>
            </Link>
            </li>
            <li className="page-item">
            <Link className="page-link" to={"/berries/page/3"}>
              <span aria-hidden="true">4</span>
              <span className="sr-only">Forth</span>
            </Link>
            </li>
            <li className="page-item">
            <Link className="page-link" to={"/berries/page/" + nxt_page}>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </Link>
            </li>
            </ul>
        </nav>
//////////////////////////
      );
    }else if(this.state.next!=null){
      return(
        <nav aria-label="Page navigation example">
          <ul className="pagination pagination-lg justify-content-center">
            <li className="page-item disabled">
            <Link className="page-link" to={"/berries/page/" + prev_page}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </Link>
            </li>
            <li className="page-item">
            <Link className="page-link" to={"/berries/page/0"}>
              <span aria-hidden="true">1</span>
              <span className="sr-only">First</span>
            </Link>
            </li>
            <li className="page-item">
            <Link className="page-link" to={"/berries/page/1"}>
              <span aria-hidden="true">2</span>
              <span className="sr-only">Second</span>
            </Link>
            </li>
            <li className="page-item">
            <Link className="page-link" to={"/berries/page/2"}>
              <span aria-hidden="true">3</span>
              <span className="sr-only">Third</span>
            </Link>
            </li>
            <li className="page-item">
            <Link className="page-link" to={"/berries/page/3"}>
              <span aria-hidden="true">4</span>
              <span className="sr-only">Forth</span>
            </Link>
            </li>
            <li className="page-item">
            <Link className="page-link" to={"/berries/page/" + nxt_page}>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </Link>
            </li>
            </ul>
        </nav>
      )

    }else if(this.state.prev!=null){
      return(
        <nav aria-label="Page navigation example">
          <ul className="pagination pagination-lg justify-content-center">
            <li className="page-item">
            <Link className="page-link" to={"/berries/page/" + prev_page}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </Link>
            </li>
            <li className="page-item">
            <Link className="page-link" to={"/berries/page/0"}>
              <span aria-hidden="true">1</span>
              <span className="sr-only">First</span>
            </Link>
            </li>
            <li className="page-item">
            <Link className="page-link" to={"/berries/page/1"}>
              <span aria-hidden="true">2</span>
              <span className="sr-only">Second</span>
            </Link>
            </li>
            <li className="page-item">
            <Link className="page-link" to={"/berries/page/2"}>
              <span aria-hidden="true">3</span>
              <span className="sr-only">Third</span>
            </Link>
            </li>
            <li className="page-item">
            <Link className="page-link" to={"/berries/page/3"}>
              <span aria-hidden="true">4</span>
              <span className="sr-only">Forth</span>
            </Link>
            </li>
            <li className="page-item disabled">
            <Link className="page-link" to={"/berries/page/" + nxt_page}>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </Link>
            </li>
            </ul>
        </nav>
      )
    }

    return ( 
      <div className="App-body">
        <h1>Please Wait.</h1>
      </div>
    );
    
  }


  render() {
    console.log("I have been here");
    let body = null;
    let li = null;
    // this.getShows();
    li =
        this.state.data &&
        this.state.data.map(show => (
          <li key={show.url.split("/")[6]}>
            <Link className="list-group-item list-group-item-action" to={`/berries/${show.url.split("/")[6]}`}>{show.name}</Link>
          </li>
        ));

    // console.log(this.state.data);
    let page_body = (this.pagecontrol());

    body = (
      <div>
        {page_body}
        <div className = "container">
        <ul className = "list-group list-group-flush">
          {li}
        </ul>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
    return body;
  }
}

export default BerriesList;
