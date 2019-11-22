import React, { Component } from "react";
import { Query } from "react-apollo";
import { Mutation } from "react-apollo";
import query from "../queries";

class ListPhotos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      pageNum: 1,
      loading: false,
      error: false
    };
  }

  handleClick() {
    // console.log('Click happened');
    this.setState({ 
      pageNum: this.state.pageNum + 1
    });
  }

  render() {
    console.log(this.state.pageNum);
    let li = null;
    let body = null;
    if (this.state.loading) {
      body = (
          <div className="App-body">
              <h1>Loading</h1>
          </div>
      );
    } else {
    
      body = (
          <div className="App-body">
            <Query query={query.GET_ImagePost} variables={{pageNum: this.state.pageNum}}
            fetchPolicy={"network-only"}>
              {({ loading, error, data }) => {
                if (error) {
                  // console.log("there's an error:", error);
                } if (loading) {
                  //console.log("is loading...")
                  return (          
                    <div className="App-body">
                      <h1>Loading</h1>
                    </div>
                  );
                }
                
                // console.log("data", data);
                const photos = data.unsplashImages || [];
                // console.log("my photos:", photos)
                
                function likeClick(updateImage, photo){
                  // console.log("like cliked")
                  // console.log({photo})
                  var newliked = true
                  if (photo.binned){
                    newliked = false
                  }
                  else{
                    newliked = true
                  }
                  // console.log({newliked})
                  updateImage({ variables: { 
                    id: photo.id,
                    liked: newliked
                    } });
                }
                
                function photoShow(photo, index, array) {
                  var liked = photo.binned
                  var bottomText = undefined
                  if (liked){
                    bottomText = "Liked"
                  }
                  else{
                    bottomText = "Like"
                  }
                  return <li key={photo.id}>
                    <div className="card-body">
                      <img src={photo.url} alt={photo.id}> 
                      </img>
                      <p>Description: {photo.description}</p>
                      <p>Author: {photo.poster_name}</p>
                      
                      <Mutation mutation={query.UpdatePhotos}>
                      {(updateImage, { data }) => (
                        
                        <button onClick={() => likeClick(updateImage, photo)}>{bottomText}</button>
                      )}
                      </Mutation>

                    </div>
                  </li>
                }
                li  = photos &&
                      photos.map(photoShow);
                
                return (
                  <div>
                    <div className = "container">
                      <ul className = "list-group list-group-flush">{li}</ul>
                    </div>
                    
                    <button class = "moreButton" onClick={() => this.handleClick()}>More</button>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />    
                  </div>
                );
              }}
            </Query>
      
          </div>
      );
    }
    return body;
  }

}

export default ListPhotos;
