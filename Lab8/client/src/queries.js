import gql from "graphql-tag";

const GET_ImagePost= gql`
  query($pageNum:Int!){
    unsplashImages(pageNum: $pageNum) {
      id,
      url,
      poster_name,
      description,
      user_posted,
      binned,
      num_binned
    }
  }
`;

const GET_MyLikes= gql`
  query{
    likedImages{
      id,
      url,
      poster_name,
      description,
      user_posted,
      binned,
      num_binned
    }
  }
`;

const TopTenBinnedPosts = gql`
  query{
    getTopTenBinnedPosts{
      id,
      url,
      poster_name,
      description,
      user_posted,
      binned,
      num_binned
    }
  }
`;
  

const Get_MyPhotos= gql`
  query{
    userPostedImages{
      id,
      url,
      poster_name,
      description,
      user_posted,
      binned,
      num_binned
    }
  }
`;

const UploadMyPhotos = gql`
  mutation($url: String!, $description: String){
    uploadImage(url: $url, description: $description){
      id,
      url,
      poster_name,
      description,
      user_posted,
      binned,
      num_binned
    }
  }
`;

const UpdatePhotos = gql`
  mutation($id: String!, $url: String, $description: String, $liked: Boolean){
    updateImage(id: $id, url: $url, description: $description, liked: $liked){
      id,
      url,
      poster_name,
      description,
      user_posted,
      binned,
      num_binned
    }
  }
`;

const DeletePhotos = gql`
  mutation($id: String!){
    deleteImage(id: $id){
      id,
      url,
      poster_name,
      description,
      user_posted,
      binned,
      num_binned
    }
  }
`;


export default {
  GET_ImagePost,
  GET_MyLikes,
  Get_MyPhotos,
  UploadMyPhotos,
  UpdatePhotos,
  DeletePhotos,
  TopTenBinnedPosts
};
