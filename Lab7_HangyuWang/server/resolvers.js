const uuid = require("node-uuid");
var lodash = require("lodash");
const { RedisCache } = require('apollo-server-cache-redis');

const DEFAULT_FLUSH_TIME = 99999999999999999
const LIST_KEY = {
  MYPOST: "My_POST",
  MYLIKED: "My_LIKED"
};
const resolvers = {
  Query: {
    unsplashImages: async (_, { pageNum }, { cache, dataSources }) => {
      // console.log("This is in the query: " + pageNum);
      let prev_list = await cache.get(LIST_KEY.MYLIKED);
      // console.log(prev_list);
      if(prev_list != null){
        let temp = JSON.parse(prev_list)
        let Photos = await dataSources.UnsplashAPI.getPhotos(pageNum);
        // console.log(temp);
        // console.log("/////////////////");
        Photos = Photos.map(p => {
                                    for(ele of temp){
                                      if(ele.id === p.id){
                                        p.binned = true;
                                      }
                                    }
                                    return p;
                                  })
        return Photos;
        // post_val.find(p => p.id == id).binned = true;

      }else{
        return await dataSources.UnsplashAPI.getPhotos(pageNum);
      }

      // return await dataSources.UnsplashAPI.getPhotos(pageNum);
    },
    
    userPostedImages: async (_, __, { cache }) => {
      let prev_list = await cache.get(LIST_KEY.MYPOST);
      // console.log(prev_list);
      if(prev_list != null){
        return JSON.parse(prev_list)
      }else{
        return null;
      }
    },

    likedImages: async (_, __, { cache }) => {
      let prev_list = await cache.get(LIST_KEY.MYLIKED);
      // console.log(prev_list);
      if(prev_list != null){
        return JSON.parse(prev_list)
      }else{
        return null;
      }
    },

    getTopTenBinnedPosts: async (_, __, { cache }) => {
      let prev_list = await cache.get(LIST_KEY.MYLIKED);
      // console.log(prev_list);
      if(prev_list != null){
        let temp_list =  JSON.parse(prev_list);
        temp_list.sort(function(a,b){return b.num_binned - a.num_binned});
        let maxNum = Math.min(10, temp_list.length);
        // console
        return temp_list.slice(0, maxNum);
      }else{
        return null;
      }
    }
  },
  
  Mutation: {
    uploadImage: async (_, { url, description }, { cache }) =>{

      let newid = uuid.v4();
      const photoInfo = {
        id: newid,
        url: url,
        poster_name: "Hangyu Wang",
        description: description,
        user_posted: true,
        binned: false,
        num_binned: 0
      }

      let prev_list = await cache.get(LIST_KEY.MYPOST);
      if(prev_list != null){
        let val = JSON.parse(prev_list);
        val.push(photoInfo);
        await cache.set(LIST_KEY.MYPOST, JSON.stringify(val), {ttl: DEFAULT_FLUSH_TIME});
      }else{
        let val = [photoInfo];
        await cache.set(LIST_KEY.MYPOST, JSON.stringify(val), {ttl: DEFAULT_FLUSH_TIME});
      }
      //console.log(cache);
      return photoInfo;
    },

    deleteImage: async (_, { id }, { cache }) =>{

      let post_list = await cache.get(LIST_KEY.MYPOST);
      let liked_list = await cache.get(LIST_KEY.MYLIKED);

      if(post_list == null){
        return null;
      }

      post_val = JSON.parse(post_list);
      
      let temp = lodash.remove(post_val, function(p) {
        return p.id == id;
      });
      await cache.set(LIST_KEY.MYPOST, JSON.stringify(post_val), {ttl: DEFAULT_FLUSH_TIME});

      if(liked_list != null){
        liked_val = JSON.parse(liked_list);
        lodash.remove(liked_val, function(p) {
          return p.id == id;
        });
        await cache.set(LIST_KEY.MYLIKED, JSON.stringify(liked_val), {ttl: DEFAULT_FLUSH_TIME});
      }

      post_list = await cache.get(LIST_KEY.MYPOST);
      post_val = JSON.parse(post_list);
      return temp[0];
    },
   

    updateImage: async (_, {id, url, description, liked}, { cache, dataSources }) => {
      let post_list = await cache.get(LIST_KEY.MYPOST);
      let liked_list = await cache.get(LIST_KEY.MYLIKED);
      // for the changing of liked
      if(liked === true){
        // console.log("Here the liked is true");
        let photoInfo;
        if (post_list != null) {
          // console.log("Here the test is");
          let post_val = JSON.parse(post_list);
          photoInfo = lodash.find(post_val, function(p){
            return p.id == id;
          } );
          if(photoInfo != null){
            post_val.find(p => p.id == id).binned = true;
            await cache.set(LIST_KEY.MYPOST, JSON.stringify(post_val), {ttl: DEFAULT_FLUSH_TIME});
          }
        }
        if(photoInfo == null){
          //console.log("Here is the log");
          photoInfo = await dataSources.UnsplashAPI.getPhotosById(id);
          // console.log(photoInfo);
        }
        if(photoInfo != null){
          photoInfo.binned = true;
          if (liked_list != null) {
            let val = JSON.parse(liked_list);
            Test_val = val.find(p => p.id == id);
            if(Test_val == undefined){
              val.push(photoInfo);
            }
            await cache.set(LIST_KEY.MYLIKED, JSON.stringify(val), {ttl: DEFAULT_FLUSH_TIME});
          } else {
            let val = [photoInfo];
            await cache.set(LIST_KEY.MYLIKED, JSON.stringify(val), {ttl: DEFAULT_FLUSH_TIME});
          }
        }
        return photoInfo;
      }else if(liked === false){
        let photoInfo;
        if (liked_list != null) {
          let liked_val = JSON.parse(liked_list);
          photoInfo = lodash.remove(liked_val, function (p) {
            return p.id == id;
          });
          photoInfo = photoInfo[0];
          photoInfo.binned = false;
          if (post_list != null && photoInfo.user_posted === true) {
            let post_val = JSON.parse(post_list);
            post_val.find(p => p.id == id).binned = false;
            await cache.set(LIST_KEY.MYPOST, JSON.stringify(post_val), {ttl: DEFAULT_FLUSH_TIME});
          }
          await cache.set(LIST_KEY.MYLIKED, JSON.stringify(liked_val), {ttl: DEFAULT_FLUSH_TIME});
        }
        return photoInfo;
      }
      // for the changing of others
      let newPhoto;
      if (post_list != null) {
        let post_val = JSON.parse(post_list);
        post_val = post_val.map( p => {
          if (p.id === id) {
            newPhoto = p;
            if (url) {
              newPhoto.url = url;
            }
            if (description) {
              newPhoto.description = description;
            }
            return newPhoto;
          }else{
            return p;
          }
        });

        if(newPhoto != null ){
          await cache.set(LIST_KEY.MYPOST, JSON.stringify(post_val), {ttl: DEFAULT_FLUSH_TIME});
        }
      }
      //update binned
      if (liked_list != null) {
        let liked_val = JSON.parse(liked_list);
        liked_val = liked_val.map( p => {
          if (p.id === id) {
            newPhoto = p;
            if (url) {
              newPhoto.url = url;
            }
            if (description) {
              newPhoto.description = description;
            }
            return newPhoto;
          }else{
            return p;
          }
        });

        if(newPhoto != null ){
          await cache.set(LIST_KEY.MYLIKED, JSON.stringify(liked_val), {ttl: DEFAULT_FLUSH_TIME});
        }
      }
      
      return newPhoto;
    }
  }
};

module.exports = resolvers;