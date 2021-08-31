const APIKey = "1719704d58808aa20b40d8e2bf9e06ee";
var cityMain = document.getElementById("cityMain");
var searchBtn = document.getElementById("searchBtn");
var recentSearch = document.getElementById("recentSearch");
var searchedCity = document.getElementById("searched");
var currentTemp = document.getElementById("currentTemp");
var currentWind = document.getElementById("currentWind");
var currentHum = document.getElementById("currentHum");
var currentUV = document.getElementById("currentUV");
var fiveDayData = document.querySelectorAll(".fiveDay");
var fiveDayMain = document.querySelectorAll(".fiveDayMain");
var fiveDayTemp = document.querySelectorAll(".fiveDayTemp");
var fiveDayWind = document.querySelectorAll(".fiveDayWind");
var fiveDayHum = document.querySelectorAll(".fiveDayHum");
var fiveDayPic = document.querySelectorAll(".fiveDayPic");

function forcast() {
    
    var cityName = searchedCity.value.trim();
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    // var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
    
    fetch(currentURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        
        // var searchedList = document.createElement('li');

        var currentDate = new Date(data.dt*1000);
        var currentMonth = currentDate.getMonth()+1;
        var currentDay = currentDate.getDate();
        var currentYear = currentDate.getFullYear();
        var currentPic = document.createElement("img");
        var currentFTemp = Math.floor(((data.main.temp - 273.15) * 9 / 5) + 32);
        
        cityMain.textContent = data.name + " " + currentMonth + "/" + currentDay + "/" + currentYear;
        currentPic.alt = data.weather[0].icon;
        currentPic.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        cityMain.appendChild(currentPic);
        
        currentTemp.textContent = "Temp: " + currentFTemp + " °F"
        currentWind.textContent = "Wind Speed: " + data.wind.speed + " MPH";
        currentHum.textContent = "Humidity: " + data.main.humidity + "%";
        currentUV.textContent = "UV Index: ";
        
        
        var UVURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + APIKey;
        
        fetch(UVURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            var UVIndex = data.current.uvi;
            var UVColor = document.createElement('span');
            UVColor.textContent = UVIndex;
            if (UVIndex <= 2) {
                UVColor.classList = "favorable";
            }
            else if (UVIndex > 2 && UVIndex <= 8) {
                UVColor.classList = "moderate";
            } else {
                UVColor.classList = "severe";
            }
            currentUV.appendChild(UVColor);

            var dailyData = data.daily.slice(0, 5);
            console.log(dailyData);
            
          //  for(i=0; i<5; i++) {
              var fiveDayDate = new Date (dailyData[0].dt*1000);
              var fiveDayMonth = fiveDayDate.getMonth()+1;
              var fiveDayDay= fiveDayDate.getDate();
              var fiveDayYear = fiveDayDate.getFullYear();
              fiveDayMain.textContent = fiveDayMonth + "/" + fiveDayDay + "/" + fiveDayYear;

               // fiveDayMain.textContent = "Wind: " + dailyData[0].wind_speed + " MPH";
          //  }

            
        //     for (i=0; fiveDayData.length; i++){
        //         fiveDayTemp.textContent

        //         fiveDayData[i].innerHTML = "";
            
                //var fiveDayFTemp = Math.floor(((data.daily[0].temp.day - 273.15) * 9 / 5) + 32);
                
        //         fiveDayPic.alt = data.daily[0].weather[0].icon;
        //         fiveDayPic.src = "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + "@2x.png";
                
        //         fiveDayTemp.textContent = "Temp: " + fiveDayFTemp + " °F"
        //         fiveDayWind.textContent = "Wind Speed: " + data.daily[0].wind_speed + " MPH";
        //         fiveDayHum.textContent = "Humidity: " + data.daily[0].humidity + "%";
        // }

        });
    });
    
    // fetch(UVURL)
    // .then(function (response) {
    //     return response.json();
    // })
    // .then(function (data) {
    //     console.log(data);
        
        // for (var i=0; i<5; i++) {
            // }
            // })

}

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    forcast();
});