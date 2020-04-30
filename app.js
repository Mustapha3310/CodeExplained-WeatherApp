// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0


// Select Elements
var DOMstrings = {
    iconElement: document.querySelector('.weather-icon'),
    tempElement: document.querySelector('.temperature-value p'),
    descElement: document.querySelector('.temperature-description p'),
    locationElement: document.querySelector('.location p'),
    notificationElement: document.querySelector('.notification')
};

//App Data
const weather = {
    temperature: {
        unit: 'celsius'
    },
};

// APP CONST AND VARS
const KELVIN = 273;
// API KEY
const key = '82005d27a116c2880c8f0fcb866998a0';

// CHECK IN FROWSER SUPPORT GEOLOCATION
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    var notif = DOMstrings.notificationElement;
    notif.style.display = 'block';
    notif.innerHTML = `<p>Browser Does't Support Geolocation</p>`;
}

// SET USER'S POSITION
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error) {
    var notif = DOMstrings.notificationElement;
    notif.style.display = 'block';
    notif.innerHTML = `<p>${error.message}</p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
}

// Display weather to UI
function displayWeather() {

    DOMstrings.iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    DOMstrings.tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    DOMstrings.descElement.innerHTML = weather.description;
    DOMstrings.locationElement.innerHTML = `${weather.city}, ${weather.country}`;

}

// C to Fahrenheit

function toFahrenheit(temp){
    return(temp *9/5) + 32;
}


// when the user clicks on the temperature element
DOMstrings.tempElement.addEventListener('click', function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == 'celsius'){
        let fahrenheit = toFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        DOMstrings.tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = 'fahrenheit';
    }else{
        DOMstrings.tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = 'celsius';
    }
})

