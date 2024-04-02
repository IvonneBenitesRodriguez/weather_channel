let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
  let now = new Date();
  let day = document.querySelector(".day");
  let today = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  
  day.innerHTML = `${today} ${hours}:${minutes}:${seconds}`;
  
  function displayWeatherCondition(response) {
    console.log(response.data);
    document.querySelector(".city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
  
    document.querySelector("#humidityInformation").innerHTML =
      response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#descriptionWeather").innerHTML =
      response.data.weather[0].description;
  }
  
  function searchCity(city) {
    let apikey = "50d450f200d9a85e6898548597a9f0b0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function showCity(event) {
    event.preventDefault();
    let city = document.querySelector("#city-search").value;
    searchCity(city);
  }
  
  function searchLocation(position) {
    let apikey = "50d450f200d9a85e6898548597a9f0b0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apikey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  let button = document.querySelector(".btn-outline-success");
  button.addEventListener("click", showCity);
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  searchCity("New York");
  