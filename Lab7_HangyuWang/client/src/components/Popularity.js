import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import query from "../queries";
// import { useQuery } from '@apollo/react-hooks';

class Popularity extends Component {

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
        <Query query={query.TopTenBinnedPosts}
        fetchPolicy={"network-only"}>
          {({ loading, error, data }) => {
            if (error) {
              // console.log("there's an error:", error);
              window.location.assign("http://localhost:3000/ErrorPage");
            } if (loading) {
              // console.log("is loading...")
              return <h1>Loading...</h1>
            }
            // console.log("data", data);
            const photos = data.getTopTenBinnedPosts || [];

            // console.log("my photos:", photos)
            
            var totalbins = photos.reduce(function (accumulator, photo) {
                return accumulator + photo.num_binned;
              }, 0);
            var category;
            if(photos.length == 0){
              category = "No binned photos"
            }else{
              if (totalbins > 200){
                category = "Mainstream";
              }else{
                category = "Non-mainstream";
              }
            }
            
            // console.log("my photos:", photos)
            // li =  photos &&
            //       photos.map(photo => (
            //         <li>
            //           <div className="card-body">
            //             <img src={photo.url} alt={photo.id}> 
            //             </img>
            //             <p>Description: {photo.description}</p>
            //             <p>Author: {photo.poster_name}</p>
            //           </div>
            //         </li>
            //       ));
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
                  
                  <Mutation mutation={query.UpdatePhotos}
                  refetchQueries={() => {
                    // console.log("refetchQueries")
                      return [
                        {
                          query: query.TopTenBinnedPosts
                        }
                      ];
                  }}
                  >
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
                  <h1>{category}</h1>
                  
                <div className = "container">
                  <ul className = "list-group list-group-flush">{li}</ul>
                </div>
              </div>
            );
          }}
        </Query>

        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }

}

export default Popularity;
