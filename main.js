$(document).ready(function() {
  //if geolocation is set to on  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      //set up latitude and longitude variables
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      //set up api link
      var api = 'https://fcc-weather-api.glitch.me/api/current?lon='+longitude+'&lat='+latitude+'';
        
       //get JSON file and parse info 
       $.getJSON(api, function(data) {
          var city = data.name;
          var degree = "\xB0";
          //celsius
          var currentTemp = data.main.temp;
          var tempLow = data.main.temp_min;
          var tempHigh = data.main.temp_max;
          //farenheit
          var currentFaren = Math.floor(currentTemp * 9/5 + 32);
          var tempLowFaren = Math.floor(tempLow * 9/5 + 32);
          var tempHighFaren = Math.floor(tempHigh * 9/5 + 32);
          //miscellaneous variables
          var conditions = data.weather[0].main;
          var description = data.weather[0].description;
          var image = data.weather[0].icon;
          var hotPicture  = 'url(photos/hot.png)';
          var coldPicture = 'url(photos/cold.png)';
          var warmPicture  = 'url(photos/warm.png)';
          var coolPicture = 'url(photos/cool.png)';

          $("#icon").attr('src', image);
          $("#city").html(city);
          $("#currentTemp").html(currentFaren + degree);
          $("#highTemp").html(tempHighFaren + degree);
          $("#lowTemp").html(tempLowFaren + degree);
          $("#conditions").html(conditions);
          $("#description").html(description);
          
          //farenheit button event handler
          $("#Farenheit").click(function(){
            $("#currentTemp").html(currentFaren + degree);
            $("#highTemp").html(tempHighFaren + degree);
            $("#lowTemp").html(tempLowFaren + degree);
   	      });
          //celsius button eventhandler
   	      $("#Celsius").click(function(){
            $("#currentTemp").html(currentTemp + degree);
            $("#highTemp").html(tempHigh + degree);
            $("#lowTemp").html(tempLow + degree);
   	      });
   	      //logic statements depending on temperature
          
          if(currentFaren > 90){
          	$("#message").html("Supaa HOT, stay hydrated!");
          	$(".bg").css("background-image", hotPicture); 
          } else if(currentFaren > 75){
          	$("#message").html("Nice, t-shirt weather!");
          	$(".bg").css("background-image", warmPicture); 	
          } else if(currentFaren > 60){
          	$("#message").html("gettin a bit chilly");
          	$(".bg").css("background-image", coolPicture); 
          } else if(currentFaren < 60){
          	$("#message").html("wear a jacket out there");
          	$(".bg").css("background-image", coldPicture); 
          }
 	   });

       

    });
  } 

  
});
