const {
  RESTDataSource
} = require('apollo-datasource-rest');
var YOUR_ACCESS_KEY = "69dc8bf624d7f8d6130583db30d22a52cd559fdf0c20907d208855628b5dd8c7";

class PhotoAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.unsplash.com/';
  }

  async getPhotos(PageNum) {
    // console.log(PageNum);
    let photos;
    if (!PageNum) {
      // throw {
      //   error: "Please input a PageNum."
      // }
      photos = await this.get(`photos?client_id=${YOUR_ACCESS_KEY}`);
    } else {
      photos = await this.get(`photos?page=${PageNum}&client_id=${YOUR_ACCESS_KEY}`);
    }

    return Array.isArray(photos) ?
      photos.map(photo => this.photoReducer(photo)) :
      []
  }

  async getPhotosById(id) {
    // console.log(id);
    try {
      let photo;
      if (!id) {
        throw {
          error: "Please input a id to get the photo."
        }
      } else {
        // console.log("Here we are testing the getPhotosById");
        photo = await this.get(`photos/${id}?client_id=${YOUR_ACCESS_KEY}`);
        // console.log(photo);
      }
      //console.log(photo);

      return this.photoReducer(photo);

    } catch (e) {
      throw e;
    }

  }

  photoReducer(photo) {
    // let photo = unsplashdata[0];
    const id = photo.id;
    const url = photo.urls.regular;
    const poster_name = photo.user.name;
    const description = photo.description;
    const likes = photo.likes;
    const photoInfo = {
      id: id,
      url: url,
      poster_name: poster_name,
      description: description,
      user_posted: false,
      binned: false,
      num_binned: likes
    }
    return photoInfo;
  }

  // async getMostViewedMovies(limit = 10) {
  //   const data = await this.get('movies', {
  //     per_page: limit,
  //     order_by: 'most_viewed',
  //   });
  //   return data.results;
  // }
}

module.exports = PhotoAPI;