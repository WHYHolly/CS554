import React, { Component } from "react";
//Import Query from react-apollo
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
class EditPhotos extends Component {
  constructor(props) {
    //console.log(this.props.photos);
    super(props);
    this.state = {
      showEdit: this.props.isOpen,
      photo: this.props.photo
    };
    this.handleCloseEdit = this.handleCloseEdit.bind(this);
  }

  handleCloseEdit() {
    this.setState({ showEdit: false, photos: null });
    this.props.handleClose();
  }

  render() {
    let inputUrl;
    let inputDescription;
    return (
      <div>
        <ReactModal
          name="editModal"
          isOpen={this.state.showEdit}
          contentLabel="Edit Photos"
          style={customStyles}
        >
          <Mutation mutation={queries.UpdatePhotos}>
            {(updateImage, { data }) => (
              <form
                className="form"
                id="add-photo"
                onSubmit={e => {
                  e.preventDefault();
                  // console.log(this.props.photo.id)
                  updateImage({ variables: {
                      id: this.props.photo.id,
                      url: inputUrl.value,
                      description: inputDescription.value
                    }
                  });
                  inputUrl.value = "";
                  inputDescription.value = "";
                  this.setState({ showEdit: false });
                  alert("Photo Updated");
                  this.props.handleClose();
                }}
              >
                <div className="form-group">
                  <label className="labelInForm" for="URL">new Url:</label>
                    <br />
                    <input
                      id="URL"
                      type="url"
                      ref={node => {
                        inputUrl = node;
                      }}
                      required
                      defaultValue={this.props.photo.url}
                      autoFocus={true}
                    />
                </div>
                <br />
                <div className="form-group">
                  <label className="labelInForm" for="Des">new Description:</label>
                    <br />
                    <input
                      id="Des"
                      ref={node => {
                        inputDescription = node;
                      }}
                      defaultValue={this.props.photo.description}
                    />
                </div>
                <br />
                <br />
                <br />
                <button className="button add-button" type="submit">
                  Update Photo
                </button>
              </form>
            )}
          </Mutation>
          <br />
          <button
            className="button cancel-button"
            onClick={this.handleCloseEdit}
          >
            Cancel
          </button>
        </ReactModal>
      </div>
    );
  }
}

export default EditPhotos;
