const apiKey = "XUXIFWUR9lLg7f6ef5ngtZKKYBI4OG6m";
const getWeatherButton = document.getElementById("getWeather");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const errorElement = document.getElementById("error");

const cityName = document.getElementById("cityName"); 
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const condition = document.getElementById("condition");

getWeatherButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  fetchWeather(city);
});

function fetchWeather(city) {
  const url = `https://api.tomorrow.io/v4/weather/realtime?location=${encodeURIComponent(city)}&apikey=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found.");
      }
      return response.json();
    })
    .then((data) => {
        console.log(data);
      displayWeather(data);
    })
    .catch((error) => {
      showError(error.message);
    });
}

function displayWeather(data) {
  weatherInfo.classList.remove("hidden");
  errorElement.classList.add("hidden");

  cityName.textContent =  data.location.name || "Unknown";
  temperature.textContent = data.data.values.temperature; 
  humidity.textContent = data.data.values.humidity;
  condition.textContent = data.data.values.weatherCode; 
}

function showError(message) {
  weatherInfo.classList.add("hidden");
  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
}