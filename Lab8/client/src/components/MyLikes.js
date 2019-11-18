import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import query from "../queries";
// import { useQuery } from '@apollo/react-hooks';

class MyLikes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false,
      error: false
    };
  }
  
  render() {
    let li = null;
    return (
      <div>
        <Query query={query.GET_MyLikes}
        fetchPolicy={"network-only"}>
          {({ loading, error, data }) => {
            if (error) {
              console.log("there's an error:", error);
            } if (loading) {
              console.log("is loading...")
              return (          
                <div className="App-body">
                  <h1>Loading</h1>
                </div>
              );
            }
            console.log("data", data);
            const photos = data.likedImages || [];

            function likeClick(updateImage, photo){
              console.log("like cliked")
              console.log({photo})
              var newliked = true
              if (photo.binned){
                newliked = false
              }
              else{
                newliked = true
              }
              console.log({newliked})
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

            if (photos===null || photos.length===0){
              return (          
                <div className="App-body">
                  <h1>empty like</h1>
                </div>
              );
            }

            li  = photos &&
                  photos.map(photoShow);

            return (
              <div>
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
          }}
        </Query>

        
      </div>
    );
  }

}

export default MyLikes;
