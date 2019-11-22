import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import queries from "../queries";

import EditPhotos from "./EditPhotos";
import DeletePhotos from "./DeletePhotos"

class MyPhotos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false,
      error: false,
      
      showEdit: false,
      showDelete: false,
      editPhoto: null,
      deletePhoto: null
    };
    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleOpenDelete = this.handleOpenDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpenEdit(photo) {
    this.setState({
      showEdit: true,
      editPhoto: photo
    });
  }

  handleOpenDelete(photo) {
    this.setState({
      showDelete: true,
      deletePhoto: photo
    });
  }

  handleClose() {
    this.setState({
      showEdit: false,
      showDelete: false
    });
  }

  render() {
    let li = null;
    return (
      <div>
        <Query query={queries.Get_MyPhotos}
              //fetchPolicy={"cache-and-network"}
              fetchPolicy={"network-only"}
        >
          {({ loading, error, data }) => {
            if (error) {
              console.log("there's an error:", error);

            } if (loading) {
              // console.log("is loading...")
              return <h1>loading...</h1>
            }
            // console.log("data", data);
            const photos = data.userPostedImages || [];

            // console.log("my posted photos:", photos)
            
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
            var that = this;
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
                  
                  <Mutation mutation={queries.UpdatePhotos}>
                  {(updateImage, { data }) => (
                    
                    <button onClick={() => likeClick(updateImage, photo)}>{bottomText}</button>
                  )}
                  </Mutation>

                  <button
                    className="button"
                    onClick={() => {
                      that.handleOpenEdit(photo);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="button"
                    onClick={() => {
                      that.handleOpenDelete(photo);
                    }}
                  >
                    Delete
                  </button>

                </div>
              </li>
            }

            if (photos === null || photos.length === 0){
              return (          
                <div className="App-body">
                  <h1>empty post</h1>
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

        {/* Edit Photo */}
        {this.state && this.state.showEdit && (
          <EditPhotos
            isOpen={this.state.showEdit}
            photo={this.state.editPhoto}
            handleClose={this.handleClose}
          />
        )}

        {/* Delete Photo */}
        {this.state && this.state.showDelete && (
          <DeletePhotos
            isOpen={this.state.showDelete}
            handleClose={this.handleClose}
            deletePhoto={this.state.deletePhoto}
          />
        )}

      </div>
    );
  }

}

export default MyPhotos;
