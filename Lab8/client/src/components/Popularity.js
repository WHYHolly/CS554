import React, { Component } from "react";
import { Query } from "react-apollo";
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
              console.log("there's an error:", error);
            } if (loading) {
              console.log("is loading...")
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
            li =  photos &&
                  photos.map(photo => (
                    <li>
                      <div className="card-body">
                        <img src={photo.url} alt={photo.id}> 
                        </img>
                        <p>Description: {photo.description}</p>
                        <p>Author: {photo.poster_name}</p>
                      </div>
                    </li>
                  ));
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

        
      </div>
    );
  }

}

export default Popularity;
