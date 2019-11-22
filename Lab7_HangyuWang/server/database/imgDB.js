const fetch = require('node-fetch');

// const url = "https://api.unsplash.com/photos/?client_id=69dc8bf624d7f8d6130583db30d22a52cd559fdf0c20907d208855628b5dd8c7";
const url = "https://api.unsplash.com/photos/NR_tXTuypak?client_id=69dc8bf624d7f8d6130583db30d22a52cd559fdf0c20907d208855628b5dd8c7";
            // "https://api.unsplash.com/photos/NR_tXTuyTak&client_id=69dc8bf624d7f8d6130583db30d22a52cd559fdf0c20907d208855628b5dd8c7"
fetch(url)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (unsplashdata) {
        // let photo = unsplashdata[0];
        // console.log(photo);
        let photo = unsplashdata;
        console.log(unsplashdata);
        const id = photo.id;
        const url = photo.urls.regular;
        const poster_name = photo.user.name;
        const description = photo.description;
        const photoInfo = {
            id: id,
            url: url,
            poster_name: poster_name,
            description: description,
            user_posted: false,
            binned: false
        }
        console.log(photoInfo);
    });
// let arr = [{
//     0: "wer"
// },{
//     1: "wer"
// },{
//     3: "wer"
// }];
// let str = JSON.stringify(arr);
// console.log(JSON.parse(str));
