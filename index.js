const apikey = "46f80a02ecae410460d59960ded6e1c6";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});

// JavaScript pour masquer l'élément de bienvenue après un certain temps
window.addEventListener("load", function () {
  const welcomeElement = document.querySelector(".welcome");
  setTimeout(() => {
    welcomeElement.style.visibility = "hidden";
    welcomeElement.style.animation = "fade-out 1s ease-in-out";
  }, 1000); // Masque l'élément de bienvenue après 3 secondes (3000 ms)
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&lang=fr&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Erreur Réseau");
    }

    const data = await response.json();

    const temperature = Math.round(data.main.temp);

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const details = [
      `Ressentie: ${Math.round(data.main.feels_like)}°C`,
      `Humidité: ${data.main.humidity}%`,
      `Vent:<br>${Math.round(data.wind.speed * 3.222)} km/h`,
    ];

    // Gestion de l'icone avec l'url
    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;
    weatherDataEl.querySelector(".description").textContent = description;

    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent =
      "Une erreur s'est produite, merci d'essayer encore";

    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}
