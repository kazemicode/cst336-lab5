const express = require("express");
const app = express();
const port = "8081";
const ip = "0.0.0.0";

// Set up view engine to use EJS files (dynamic)
app.set("view engine", "ejs");
// Use everything in public dir as static assets
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

/* Routes */

// Root route
app.get("/", async function(req, res) {
  let keyword = "";
  var imageURLs = await tools.getRandomImages(keyword, 1);
  res.render("index", {"imageURLs": imageURLs});      
});
// --- End root route

// Search route
app.get("/search", async function(req, res) {
  let keyword = req.query.keyword;
//   getRandomImages_cb(keyword, 9, function(imageURLs) {
//     res.render("results", {"imageURLs": imageURLs});
//   })
  
  var imageURLs = await tools.getRandomImages(keyword, 9);
  console.log("imageURLs using promises: " +imageURLs);
  res.render("results", {"imageURLs": imageURLs, "keyword" : keyword});
  
}); // end search route


// DB route
app.get("/api/updateFavorites", function(req, res) {
  var conn = tools.createConnection();
  var sql;
  var sqlParams;
  if(req.query.action == "add"){
       sql = "INSERT INTO favorites(imageURL, keyword) VALUES (?,?)";
       sqlParams = [req.query.imageURL, req.query.keyword]; 
    }
  else{
       sql = "DELETE FROM favorites WHERE imageURL = ?";
       sqlParams = [req.query.imageURL]; 
  }
 
  conn.connect(function(err) {
    if(err) throw err;
    conn.query(sql, sqlParams, function(err, result) {
      if(err) throw err;
    }); //query
  });// connect
  res.send("it works!");
   
}); //updateFavorites
 
// display keywords route
app.get("/displayKeywords", async function(req, res) {
  var imageURLs = await tools.getRandomImages("", 1);
  var conn = tools.createConnection();
  var sql = "SELECT DISTINCT keyword FROM favorites ORDER BY keyword";
  conn.connect(function(err) {
    if (err) throw err;
    conn.query(sql, function(err, result){
      if (err) throw err;
      res.render("favorites", {"rows": result, "imageURLs": imageURLs});
      console.log(result);
    });//query
    
  });//connect
}); // display keywords route

// display favs route
app.get("/api/displayFavorites", function(req,res){
  var conn = tools.createConnection();
  var sql = "SELECT imageURL FROM favorites WHERE keyword = ?";
  var sqlParams = [req.query.keyword]; 
  conn.connect(function(err) {
    if(err) throw err;
    conn.query(sql, sqlParams, function(err, result){
      if (err) throw err;
      res.send(result);
    });//query
  });//connect
}); // display favs route
  
// Server listener
app.listen(port || process.env.PORT, ip || process.env.IP, function () {
  console.log("Express server is running...");
});



