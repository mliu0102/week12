<template>
    <div class="container">
        <div class="col-md-8 offset-md-2">
      <div class="header">
        <h1>WEATHER APP</h1>
      </div>
      <div class="search-bar">
        <input 
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input" 
        />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
  
      <main>
        <div v-if="weatherData">
          <h2>
            {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div>
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
    </div>
</div>
  </template>
  
  <script>
  import axios from "axios";
  
  const apiKey = "c2d630c2e28d47eeee854a0441361cf1";
  
  export default {
    name: "App",
    data() {
      return {
        city: "",
        weatherData: null,
        hourlyForecast: [],
        dailyForecast: [],
      };
    },
    computed: {
      temperature() {
        return this.weatherData
          ? Math.floor(this.weatherData.main.temp - 273.15)
          : null;
      },
      iconUrl() {
        return this.weatherData
          ? `https://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
          : null;
      },
    },
    mounted() {
      this.fetchCurrentLocationWeather();
    },
    methods: {
      async fetchCurrentLocationWeather() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
            await this.fetchWeatherData(url);
          });
        }
      },
      async fetchWeatherData(url) {
        try {
          const response = await axios.get(url);
          this.weatherData = response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      },
      async searchByCity() {
        if (this.city.trim()) {
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}`;
          await this.fetchWeatherData(url);
        }
      }
    }
  };
  </script>