let now = new Date();

let dateToday = document.querySelector("#dateToday");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let day = now.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
day = days[now.getDay()];
dateToday.innerHTML = `${day}, ${hours}:${minutes} `;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let comp = document.querySelector("#comp");

  if (searchInput.value) {
    comp.innerHTML = `${searchInput.value}`;
  } else {
    comp.innerHTML = null;
    alert("Please type a city");
  }
  function showTemperature(response) {
    let weatherTemp = document.querySelector("#temp");
    weather = Math.round(response.data.main.temp);
    fahrenheit = Math.round((weather * 9) / 5 + 32);
    weatherTemp.innerHTML = `<img src="images/temperature.png" alt="temp image" width="15px" height="15px">${weather}℃/${fahrenheit}℉`;

    let weatherHumidity = document.querySelector("#humidity");
    humidity = Math.round(response.data.main.humidity);
    weatherHumidity.innerHTML = `Humidity: ${humidity}%`;

    let weatherWind = document.querySelector("#windSpeed");
    wind = Math.round(response.data.wind.speed);
    weatherWind.innerHTML = `Wind Speed: ${wind}º`;

    let descriptionTemp = document.querySelector("#describe");
    description = response.data.weather[0].description;
    descriptionTemp.innerHTML = ` ${description}`;

    let weatherTimeZone = document.querySelector("#geoLocation");
    longitude = Math.round(response.data.coord.lon);
    latitude = Math.round(response.data.coord.lat);
    weatherTimeZone.innerHTML = `long:${longitude} lat: ${latitude}`;

    let weatherCountry = document.querySelector("#country");
    country = response.data.sys.country;
    weatherCountry.innerHTML = `Country:${country}`;
  }

  let city = searchInput.value;
  let apiKey = "9546ab36ab423e2c11a7498443672f82";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showPosition(position) {
  let location = document.querySelector("playLocation");
  location.innerHTML = `latitude is ${position.coords.latitude}and your longitude is ${position.coords.longitude}`;
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#button");
button.addEventListener("click", getCurrentPosition);
