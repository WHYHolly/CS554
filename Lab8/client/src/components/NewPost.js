import React, { Component } from "react";
import { Mutation } from "react-apollo";
import query from "../queries";

class NewPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      url: undefined,
      description: undefined,
      loading: false,
      error: false
    };
  }

  render() {
    //let li = null;
    let inputURL = null;
    let inputDesp = null;
    return (
      <div>
        url:
        <input
            ref={node => {
                inputURL = node;
                // this.setState({
                //     url: node
                // })
                console.log("Here is the input of inputURL");
                console.log(inputURL);
            }}
        />
        <br />
        description:
        <input
            ref={node => {
                inputDesp = node;
                // this.setState({
                //     description: node
                // })
                console.log("Here is the input of des");
                console.log(inputDesp);
            }}
        />
        <Mutation mutation={query.UploadMyPhotos}>
        {(uploadImage, { data }) => (
        <div>
            <form
            onSubmit={e => {
                e.preventDefault();
                //console.log()
                //document.getElementById("url").value
                uploadImage({ variables: { 
                    url: inputURL.value,
                    description: inputDesp.value 
                } });
                console.log("Here is the photo input:")
                console.log(inputURL.value)
                // console.log(this.state.url)
                // console.log(this.state.description)
                
                // inputURL = '';
                // inputDesp = '';
                alert("Photo Added");
            }}
            >
            
            <br />
            
            <button type="submit">Add Photo</button>
            </form>
        </div>
        )}
        </Mutation>
      </div>
    );
  }

}

export default NewPost;
