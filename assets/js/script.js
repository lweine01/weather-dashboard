const APIKey = "1719704d58808aa20b40d8e2bf9e06ee";
var cityName = "charlotte";

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

function getWeather (){
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid=" + APIKey;

    fetch(requestURL)
    .then(function(response){
        return response.json();
    })
    .then (function(data){
        console.log(data);

    })

}
getWeather();