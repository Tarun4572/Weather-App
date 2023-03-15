const notification=document.querySelector(".notification");
const weathericon=document.querySelector(".weather-icon");
const tempvalue=document.querySelector(".temperature-value p");
const tempdes=document.querySelector(".temperature-description p");
const locationelement=document.querySelector(".location p");

const KELVIN = 273;
const key = ""; // signup with weather api and api key goes here


const weather={};
weather.temperature={
    unit:"celcius"
}

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(setposition,error)
}else{
    notification.style.display="block";
    notification.innerHTML=`<p> Browser doesn't support Geolocation</p>`
}

function setposition(position) {
    
    let longitude=position.coords.longitude;
    let latitude=position.coords.latitude;

    getweather(latitude,longitude);
}

function error(Error) {
    
    notification.style.display="block";
    notification.innerHTML=`<p> ${Error.message}</p>`;
}
function getweather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    console.log(api);
             fetch(api).then(function(response) {
                 let data=response.json();
                 return data;
             })
             .then(function(data) {
                 weather.temperature.value=Math.floor(data.main.temp - KELVIN);
                 weather.description=data.weather[0].description;
                 weather.iconId=data.weather[0].icon;
                 weather.city=data.name;
                 weather.country=data.sys.country;
             })
             .then(function() {
                 displayWeather();
             })

}
function displayWeather(){
    weathericon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    
    tempvalue.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    tempdes.innerHTML = weather.description;
    locationelement.innerHTML = `${weather.city}, ${weather.country}`;
}
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempvalue.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempvalue.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempvalue.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});