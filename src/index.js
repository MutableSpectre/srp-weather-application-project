function updateWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Lansing");