const { gql } = require("apollo-server");
const lodash = require("lodash");
const uuid = require("node-uuid");
// const imgDB = require("./database");

//Create the type definitions for the query and our data
const typeDefs = gql`
  type Query {
    unsplashImages(pageNum: Int): [ImagePost]
    likedImages: [ImagePost]
    userPostedImages: [ImagePost]
    getTopTenBinnedPosts: [ImagePost]
  }

  type ImagePost {
    id: ID!
    url: String!
    poster_name: String!
    description: String
    user_posted: Boolean!
    binned: Boolean!
    num_binned: Int!
  }

  type Mutation {
    uploadImage(
      url: String!, 
      description: String
    ): ImagePost

    updateImage(
      id: String!,
      url: String, 
      description: String, 
      liked: Boolean
    ): ImagePost

    deleteImage(
      id: String!
    ): ImagePost
  }
`;

module.exports = typeDefs;