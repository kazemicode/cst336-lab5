$(document).ready(function(){
  $(document).on("click", ".favoriteIcon", function() {
    alert("it works!");
    var imageURL = $(this).prev().attr("src");
    if($(this).attr("src") == "img/fav_off.png"){
      $(this).attr("src", "img/fav_on.png");
      updateFavorite("add", imageURL); // inserts a new record
    }
    else{
      $(this).attr("src", "img/fav_off.png");
      updateFavorite("delete", imageURL); // deletes a record
    }
  }); // on click favorite icon
  
  // event listener
  $(".keywordLink").on("click", function() {
    // alert($(this).text().trim());
     $.ajax({
      method: "get",
      url: "/api/displayFavorites",
      data: {
             "keyword" : $(this).text().trim()
            },
       success: function(rows, status){
         $("#favorites").html("");
          rows.forEach(function(row, index){
            (index % 4 == 0) ?  $("#favorites").append('<br>') : $("#favorites").append('');
            $("#favorites").append("<div class = 'imageContainer'> <img class= 'image' src='" +row.imageURL+ "' width='200' height= '200'><img class = 'favoriteIcon' src='img/fav_on.png' width='20'></div>");
           
          })
       }
    }); //ajax
  }); // keywordLink onClick
  
  function updateFavorite(action, imageURL) {
    $.ajax({
      method: "get",
      url: "/api/updateFavorites",
      data: {"imageURL" : imageURL,
             "keyword" : $("#keyword").val(),
             "action" : action
             }
    }); //ajax
  } // updateFavorite
});