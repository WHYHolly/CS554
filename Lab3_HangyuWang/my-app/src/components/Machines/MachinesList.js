import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PageNotFound from "../PageNotFound";

class MachinesList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      prev: undefined,
      cur: undefined,
      next: undefined,
      total: undefined,
      loading: false,
      error: false
    };
  }

  NumberFilter(cur_in){
    let isnum = /^\d+$/.test(cur_in);
    //let cur;
    if(isnum){
      return parseInt(cur_in);
    }else{
      window.location.assign("http://localhost:3000/PageNotFound");
    }

  }

  async getShows() {
    
    try {
      
      let Offset = this.NumberFilter(this.props.match.params.page);

      const response = await axios.get(`https://pokeapi.co/api/v2/machine/?offset=${Offset*20}&limit=20`);
      
      let temp_data = response.data.results;
      let data_arr = [];

      data_arr.length = temp_data.length;
      let new_arr = Array(temp_data.length).fill().map((v,i)=>i);

      this.setState({ 
        data: new_arr,
        cur: Offset,
        prev: response.data.previous,
        next: response.data.next,
        total: response.data.count
      });
    } catch (e) {
      window.location.assign("http://localhost:3000/PageNotFound");
    }
  }

  componentDidMount() {
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

    if(cur_page<0 || cur_page>this.state.total/20){
      this.state({
        error: true
      });
      // window.location.assign("http://localhost:3000/PageNotFound");
    }

    let last_body = (
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-lg justify-content-center">
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/" + prev_page}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+(Math.floor(this.state.total/20-6))}>
            <span aria-hidden="true">{Math.floor(this.state.total/20-5)}</span>
            <span className="sr-only">First</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+(Math.floor(this.state.total/20-5))}>
            <span aria-hidden="true">{Math.floor(this.state.total/20-4)}</span>
            <span className="sr-only">Second</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+(Math.floor(this.state.total/20-4))}>
            <span aria-hidden="true">{Math.floor(this.state.total/20-3)}</span>
            <span className="sr-only">Third</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+(Math.floor(this.state.total/20-3))}>
            <span aria-hidden="true">{Math.floor(this.state.total/20-2)}</span>
            <span className="sr-only">Forth</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+(Math.floor(this.state.total/20-2))}>
            <span aria-hidden="true">{Math.floor(this.state.total/20-1)}</span>
            <span className="sr-only">Fifth</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+ (Math.floor(this.state.total/20-1))}>
            <span aria-hidden="true">{Math.floor(this.state.total/20)}</span>
            <span className="sr-only">Sixth</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+ Math.floor(this.state.total/20)}>
            <span aria-hidden="true">{Math.floor(this.state.total/20+1)}</span>
            <span className="sr-only">Seventh</span>
          </Link>
          </li>
          <li className="page-item disabled">
          <Link className="page-link" to={"/machines/page/" + nxt_page}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </Link>
          </li>
          </ul>
        </nav>
    );

    let start_body = (
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-lg justify-content-center">
          <li className="page-item disabled">
          <Link className="page-link" to={"/machines/page/" + prev_page}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/0"}>
            <span aria-hidden="true">1</span>
            <span className="sr-only">First</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/1"}>
            <span aria-hidden="true">2</span>
            <span className="sr-only">Second</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/2"}>
            <span aria-hidden="true">3</span>
            <span className="sr-only">Third</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/3"}>
            <span aria-hidden="true">4</span>
            <span className="sr-only">Forth</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/4"}>
            <span aria-hidden="true">5</span>
            <span className="sr-only">Fifth</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/5"}>
            <span aria-hidden="true">6</span>
            <span className="sr-only">Sixth</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/6"}>
            <span aria-hidden="true">7</span>
            <span className="sr-only">Seventh</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/" + nxt_page}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </Link>
          </li>
          </ul>
        </nav>
    );

    let mid_body = (
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-lg justify-content-center">
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/" + prev_page}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+(this.state.cur-3)}>
            <span aria-hidden="true">{this.state.cur-2}</span>
            <span className="sr-only">First</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+(this.state.cur-2)}>
            <span aria-hidden="true">{this.state.cur-1}</span>
            <span className="sr-only">Second</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+(this.state.cur-1)}>
            <span aria-hidden="true">{this.state.cur}</span>
            <span className="sr-only">Third</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+this.state.cur}>
            <span aria-hidden="true">{this.state.cur+1}</span>
            <span className="sr-only">Forth</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+(this.state.cur+1)}>
            <span aria-hidden="true">{this.state.cur+2}</span>
            <span className="sr-only">Fifth</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+(this.state.cur+2)}>
            <span aria-hidden="true">{this.state.cur+3}</span>
            <span className="sr-only">Sixth</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+(this.state.cur+3)}>
            <span aria-hidden="true">{this.state.cur+4}</span>
            <span className="sr-only">Seventh</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/" + nxt_page}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </Link>
          </li>
          </ul>
      </nav>
    );

    let start_body_fix = (
    <nav aria-label="Page navigation example">
    <ul className="pagination pagination-lg justify-content-center">
      <li className="page-item">
      <Link className="page-link" to={"/machines/page/" + prev_page}>
        <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span>
      </Link>
      </li>
      <li className="page-item">
      <Link className="page-link" to={"/machines/page/0"}>
        <span aria-hidden="true">1</span>
        <span className="sr-only">First</span>
      </Link>
      </li>
      <li className="page-item">
      <Link className="page-link" to={"/machines/page/1"}>
        <span aria-hidden="true">2</span>
        <span className="sr-only">Second</span>
      </Link>
      </li>
      <li className="page-item">
      <Link className="page-link" to={"/machines/page/2"}>
        <span aria-hidden="true">3</span>
        <span className="sr-only">Third</span>
      </Link>
      </li>
      <li className="page-item">
      <Link className="page-link" to={"/machines/page/3"}>
        <span aria-hidden="true">4</span>
        <span className="sr-only">Forth</span>
      </Link>
      </li>
      <li className="page-item">
      <Link className="page-link" to={"/machines/page/4"}>
        <span aria-hidden="true">5</span>
        <span className="sr-only">Fifth</span>
      </Link>
      </li>
      <li className="page-item">
      <Link className="page-link" to={"/machines/page/5"}>
        <span aria-hidden="true">6</span>
        <span className="sr-only">Sixth</span>
      </Link>
      </li>
      <li className="page-item">
      <Link className="page-link" to={"/machines/page/6"}>
        <span aria-hidden="true">7</span>
        <span className="sr-only">Seventh</span>
      </Link>
      </li>
      <li className="page-item">
      <Link className="page-link" to={"/machines/page/" + nxt_page}>
        <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">Next</span>
      </Link>
      </li>
      </ul>
    </nav>
    );

    let last_body_fix = (
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-lg justify-content-center">
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/" + prev_page}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+(Math.floor(this.state.total/20-6))}>
            <span aria-hidden="true">{Math.floor(this.state.total/20-5)}</span>
            <span className="sr-only">First</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+(Math.floor(this.state.total/20-5))}>
            <span aria-hidden="true">{Math.floor(this.state.total/20-4)}</span>
            <span className="sr-only">Second</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+(Math.floor(this.state.total/20-4))}>
            <span aria-hidden="true">{Math.floor(this.state.total/20-3)}</span>
            <span className="sr-only">Third</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+(Math.floor(this.state.total/20-3))}>
            <span aria-hidden="true">{Math.floor(this.state.total/20-2)}</span>
            <span className="sr-only">Forth</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+(Math.floor(this.state.total/20-2))}>
            <span aria-hidden="true">{Math.floor(this.state.total/20-1)}</span>
            <span className="sr-only">Fifth</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+ (Math.floor(this.state.total/20-1))}>
            <span aria-hidden="true">{Math.floor(this.state.total/20)}</span>
            <span className="sr-only">Sixth</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/"+ Math.floor(this.state.total/20)}>
            <span aria-hidden="true">{Math.floor(this.state.total/20+1)}</span>
            <span className="sr-only">Seventh</span>
          </Link>
          </li>
          <li className="page-item">
          <Link className="page-link" to={"/machines/page/" + nxt_page}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </Link>
          </li>
          </ul>
        </nav>
    );

    if(this.state.next!=null && this.state.prev!=null){
      if(this.state.cur<=3){
        return start_body_fix;
      }else if(this.state.cur>=Math.floor(this.state.total/20-2)){
        return last_body_fix;
      }else{
        return mid_body;
      }
    }else if(this.state.next!=null){
      return start_body;

    }else if(this.state.prev!=null){
      return last_body;
    }

    return ( 
      <div className="App-body">
        <h1>Please Wait.</h1>
      </div>
    );
    
  }


  render() {
    let body = null;
    let li = null;

    if(this.state.error){
      body = (
        <div>
          <PageNotFound />
        </div>
      );
    }else{

      li = 
          this.state.data &&
          this.state.data.map((show, index) => (
            <li key={this.state.cur+index+1}>
              <Link className="list-group-item list-group-item-action" to={`/machines/${this.state.cur*20+index+1}`}>machine with ID{this.state.cur*20+index+1}</Link>
            </li>
          ));

      let page_body = (this.pagecontrol());

      body = (
        <div>
          {page_body}
          <div className = "container">
            <ul className = "list-group list-group-flush">{li}</ul>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      );
    }
    return body;
  }
}

export default MachinesList;
