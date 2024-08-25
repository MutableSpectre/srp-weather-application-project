function updateWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let windSpeed = response.data.wind.speed;
    let iconElement = document.querySelector("#changing-icon");

    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${Math.round(windSpeed)} mph`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-emoji" />`;

    getForecast(response.data.city);
}

function searchCity(city) {
     let apiKey = "40e28c77t4bb5368od54b9ccc0f6fad9";
     let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
     axios.get(apiUrl).then(updateWeather);
    }

function searchSubmit(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-form-input");
    searchCity(searchInputElement.value);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }

  function getForecast(city) {
    let apiKey = "40e28c77t4bb5368od54b9ccc0f6fad9";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
  }

  function displayForecast(response) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
      forecastHtml = 
        forecastHtml + 
        `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
          </div>
        </div>
      `;
      }
    }); 

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);

searchCity("Lansing");
displayForecast();