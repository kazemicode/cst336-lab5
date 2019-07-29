const request = require("request"); 
const mysql = require("mysql");
module.exports = {
  /**
  * Return random image URLs from an API
  * @param String keyword - search term
  * @param int count - number of random images to fetch
  * @param callback - array of image URLs
  */
   getRandomImages_cb: function(keyword, count, callback)
  {
    let orientation = "landscape";
    let id = "cdc634529efb53a4ba3f96e045fecd7458cb65559fd0c712252e461d2f839704";
    let requestURL = `https://api.unsplash.com/photos/random/?count=${count}&query=${keyword}&orientation=${orientation}&client_id=${id}`;
    request(requestURL, function(error, response, body) {
      if(!error) {
        var photoData = JSON.parse(body);
        var imageURLs = [];      
        // mapping function is the same as looping through array
        imageURLs = photoData.map(photo => photo.urls.regular);
        callback(imageURLs);
      }
      else{
        console.log("results" , {"error":  error});
      }  
    }); // end request
  },


  /**
  * Return random image URLs from an API
  * @param String keyword - search term
  * @param int count - number of random images to fetch
  * @param callback - array of image URLs
  */
  getRandomImages: function(keyword, count)
  {
    let orientation = "landscape";
    let id = "cdc634529efb53a4ba3f96e045fecd7458cb65559fd0c712252e461d2f839704";
    let requestURL = `https://api.unsplash.com/photos/random/?count=${count}&query=${keyword}&orientation=${orientation}&client_id=${id}`;
    return new Promise( function(resolve, reject) {
      request(requestURL, function(error, response, body) {
        if(!error) {
          var photoData = JSON.parse(body);
          var imageURLs = [];      
          // mapping function is the same as looping through array
          imageURLs = photoData.map(photo => photo.urls.regular);
          //return imageURLs;
          resolve(imageURLs);
        }
        else{
          console.log("results" , {"error":  error});
        }  
      }); // end request
   }); // Promise
  }, // function
  
  /**
  * creates database connection
  * @return db connection
  */
  createConnection: function()
  {
    var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "img_gallery"
  })
    return conn;
  }
}  