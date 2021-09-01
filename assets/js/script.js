const APIKey = "1719704d58808aa20b40d8e2bf9e06ee";
var cityMain = document.getElementById("cityMain");
var searchBtn = document.getElementById("searchBtn");
var recentSearch = document.getElementById("recentSearch");
var searchedCity = document.getElementById("searched");
var currentTemp = document.getElementById("currentTemp");
var currentWind = document.getElementById("currentWind");
var currentHum = document.getElementById("currentHum");
var currentUV = document.getElementById("currentUV");
var fiveDay = document.querySelectorAll(".fiveDay");
var lastSearch;

if (localStorage.getItem("search")){
    lastSearch = localStorage.getItem("search").split(",")
} else {
    lastSearch=[];
}

function forcast(cityName) {
    
    var cityName = searchedCity.value.trim();
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
   
    localStorage.setItem("search", lastSearch);
    console.log(lastSearch);

    if(!lastSearch.includes(cityName)) {
        lastSearch.push(cityName);
    }
    
    
    var buttonEl = document.createElement("button");
    buttonEl.textContent = cityName;
    buttonEl.setAttribute("class", "btn btn-secondary w-100 m-2");
    recentSearch.appendChild(buttonEl);

    
    fetch(currentURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

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
        
        var UVURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + APIKey + "&units=imperial";
        
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

            var dailyData = data.daily.slice(1, 6);
            console.log(dailyData);
            
            for (var i=0; i<5; i++) {
                fiveDay[i].innerHTML="";

                var day = dailyData[i];
                console.log(fiveDay[i]);

                var dateEl = document.createElement("h6");
                var newDate = new Date(day.dt*1000);
                var month = newDate.getMonth()+1;
                var weekDay = newDate.getDate();
                var year = newDate.getFullYear();
                dateEl.textContent = month + "/" + weekDay + "/" + year;
                fiveDay[i].appendChild(dateEl);

                var iconEl = document.createElement("img");
                iconEl.alt = day.weather[0].icon;
                iconEl.src = "http://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png";
                fiveDay[i].appendChild(iconEl);
                
                var tempMinEl = document.createElement("p");
                tempMinEl.textContent = "Temp Min: " + day.temp.min + " °F"
                fiveDay[i].appendChild(tempMinEl);

                var tempMaxEl = document.createElement("p");
                tempMaxEl.textContent = "Temp Max: " + day.temp.max + " °F";
                fiveDay[i].appendChild(tempMaxEl);

                var windEl= document.createElement("p");
                windEl.textContent = "Wind Speed: " + day.wind_speed + " MPH";
                fiveDay[i].appendChild(windEl);

                var humEl = document.createElement("p");
                humEl.textContent = "Wind Speed: " + day.humidity + "%";
                fiveDay[i].appendChild(humEl);
            }
            
        });
    });
    
}

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    forcast();

});

recentSearch.addEventListener("click", function(event){
    event.preventDefault();
    
    var cityName = event.target.innerText;

    if(!lastSearch.includes(cityName)) {
        lastSearch.push(cityName);
    }

    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
   
    localStorage.setItem("search", lastSearch);
    console.log(lastSearch);
    
    fetch(currentURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

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
        
        var UVURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + APIKey + "&units=imperial";
        
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

            var dailyData = data.daily.slice(1, 6);
            console.log(dailyData);
            
            for (var i=0; i<5; i++) {
                var day = dailyData[i];
                console.log(fiveDay[i]);

                var dateEl = document.createElement("h6");
                var newDate = new Date(day.dt*1000);
                var month = newDate.getMonth()+1;
                var weekDay = newDate.getDate();
                var year = newDate.getFullYear();
                dateEl.textContent = month + "/" + weekDay + "/" + year;
                fiveDay[i].appendChild(dateEl);

                var iconEl = document.createElement("img");
                iconEl.alt = day.weather[0].icon;
                iconEl.src = "http://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png";
                fiveDay[i].appendChild(iconEl);
                
                var tempMinEl = document.createElement("p");
                tempMinEl.textContent = "Temp Min: " + day.temp.min + " °F"
                fiveDay[i].appendChild(tempMinEl);

                var tempMaxEl = document.createElement("p");
                tempMaxEl.textContent = "Temp Max: " + day.temp.max + " °F";
                fiveDay[i].appendChild(tempMaxEl);

                var windEl= document.createElement("p");
                windEl.textContent = "Wind Speed: " + day.wind_speed + " MPH";
                fiveDay[i].appendChild(windEl);

                var humEl = document.createElement("p");
                humEl.textContent = "Wind Speed: " + day.humidity + "%";
                fiveDay[i].appendChild(humEl);
            }
            
        });
    });
    
});

function clear() {
    document.querySelector("5day").remove();
}

console.log(fiveDay[i]);

clearBtn.addEventListener("click", function(event){
    event.preventDefault
    clear();
})