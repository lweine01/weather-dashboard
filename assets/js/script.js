const APIKey = "1719704d58808aa20b40d8e2bf9e06ee";
//var cityName = "charlotte";
var cityMain = document.getElementById("cityMain");
var searchBtn = document.getElementById("searchBtn");
var recentSearch = document.getElementById("recentSearch");
var searchedCity = document.getElementById("searched");
var currentTemp = document.getElementById("currentTemp");
var currentWind = document.getElementById("currentWind");
var currentHum = document.getElementById("currentHum");
var currentUV = document.getElementById("currentUV");
var currentDate = document.getElementById("currentDate");
var currentPic = document.getElementById ("currentPic");

searchBtn.addEventListener ("submit", function(){

    var cityName = searchedCity.value.trim();
    console.log(cityName);

    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid=" + APIKey;


    fetch(requestURL)
    .then(function(response){
        return response.json();
    })
    .then (function(data){
        console.log(data);

        // var searchedList = document.createElement('li');
        // var userUrl = document.createElement('p');
        

        cityMain.textContent = data.name;
        console.log (data.weather[0].icon);
        currentPic.setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
        var currentFTemp = Math.floor(((data.main.temp - 273.15) * 9 / 5) + 32);
        currentTemp.textContent = "Temp: " + currentFTemp + " °F"
        currentWind.textContent = "Wind Speed: " + data.wind.speed + " MPH";
        currentHum.textContent = "Humidity: " + data.main.humidity + "%";
        // currentUV.textContent = "UV Index: " + data.daily.humidity;


        // usersContainer.append(userName);
        // usersContainer.append(userUrl);
    
    });
});
