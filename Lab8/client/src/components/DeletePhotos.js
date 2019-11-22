import React, { Component } from "react";
import { Mutation } from "react-apollo";
import ReactModal from "react-modal";

//Import the file where my query constants are defined
import queries from "../queries";

//For react-modal
ReactModal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    border: "1px solid #28547a",
    borderRadius: "4px"
  }
};

/* The React Apollo package grants access to a Query component, which takes a query as prop and executes it when its rendered. 
That’s the important part: it executes the query when it is rendered. 
It uses React’s render props pattern, using a child as a function implementation where you can access the result of the query as an argument.
*/
class DeletePhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: this.props.isOpen,
      photo: this.props.deletePhoto
    };
    this.handleOpenDelete = this.handleOpenDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    // console.log(this.state.photo);
  }

  handleOpenDelete() {
    this.setState({ showDelete: true });
  }

  handleCloseDelete() {
    this.setState({ showDelete: false });
    this.props.handleClose(false);
  }
  render() {
    return (
      <div>
        {/*Add Employee Modal */}
        <ReactModal
          name="delete"
          isOpen={this.state.showDelete}
          contentLabel="Delete Photo"
          style={customStyles}
        >
          {/*Here we set up the mutation, since I want the data on the page to update
						after I have added someone, I need to update the cache. If not then
						I need to refresh the page to see the data updated 

						See: https://www.apollographql.com/docs/react/essentials/mutations for more
						information on Mutations
					*/}
          <Mutation
            mutation={queries.DeletePhotos}
            refetchQueries={() => {
              // console.log("refetchQueries")
                return [
                  {
                    query: queries.Get_MyPhotos
                  }
                ];
            }}
            // update={(cache, { data: { deleteImage } }) => {
            //   const {photos} = cache.readQuery({
            //       query: queries.Get_MyPhotos
            //   });
            //   console.log(cache)
            //   console.log(cache.queries)
            //   console.log("cached photos")
            //   console.log(photos)
            //   cache.writeQuery({
            //       query: queries.Get_MyPhotos,
            //       data: {
            //           photos: photos.filter(
            //           e => e.id !== this.state.photo.id
            //       )
            //       }
            //   });
            //   }
            // }
            >
            {(deleteImage, { data }) => (
              <div>
                <p>
                  Are you sure you want to delete{" "}
                  {this.state.photo.id} {this.state.photo.description}
                  ?
                </p>

                <form
                  className="form"
                  id="delete-photo"
                  onSubmit={e => {
                    e.preventDefault();
                    deleteImage({
                      variables: {
                        id: this.state.photo.id
                      }
                    });
                    this.setState({ showDelete: false });
                    alert("Photo Deleted");
                    this.props.handleClose();
                  }}
                >
                  <br />
                  <br />
                  <button className="button add-button" type="submit">
                    Delete Photo
                  </button>
                </form>
              </div>
            )}
          </Mutation>
          <br />
          <br />
          <button
            className="button cancel-button"
            onClick={this.handleCloseDelete}
          >
            Cancel
          </button>
        </ReactModal>
      </div>
    );
  }
}

export default DeletePhotos;
