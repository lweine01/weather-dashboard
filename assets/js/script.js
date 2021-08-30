const APIKey = "1719704d58808aa20b40d8e2bf9e06ee";
var cityMain = document.getElementById("cityMain");
var searchBtn = document.getElementById("searchBtn");
var recentSearch = document.getElementById("recentSearch");
var searchedCity = document.getElementById("searched");
var currentTemp = document.getElementById("currentTemp");
var currentWind = document.getElementById("currentWind");
var currentHum = document.getElementById("currentHum");
var currentUV = document.getElementById("currentUV");
var currentDate = document.getElementById("currentDate");


function forcast() {
    
    var cityName = searchedCity.value.trim();
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    
    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        
        // var searchedList = document.createElement('li');
        


        var currentPic = document.createElement("img");
        var currentFTemp = Math.floor(((data.main.temp - 273.15) * 9 / 5) + 32);
        
        cityMain.innerHTML = data.name;
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
            console.log(data);

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
            
            // usersContainer.append(userName);
            // usersContainer.append(userUrl);
            
        });
    });
}

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    forcast();
});