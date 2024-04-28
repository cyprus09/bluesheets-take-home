import React, { useState, useEffect } from "react";
import WeatherSearch from "./WeatherSearch";
import WeatherInfo from "./WeatherInfo";

// OpenWeatherMap API key
const API_KEY = "";

function WeatherData() {
  // State variables for current city, units, and weather data
  const [currCity, setCurrCity] = useState("Singapore");
  const [units, setUnits] = useState("metric");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // useEffect hook to fetch weather data when currCity or units change
    const getWeather = async () => {
      try {
        //Fetching weather data for each city from API
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`;
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getWeather();
  }, [currCity, units]); //Dependency array for the useEffect hook

  //Function to handle city change
  const handleSearch = (newCity) => {
    setCurrCity(newCity);
  };

  //Function to handle unit change
  const handleUnitChange = (newUnit) => {
    setUnits(newUnit);
  };

  //Render the WeatherSearch and WeatherInfo components
  return (
    <div className="container">
      <WeatherSearch
        onSearch={handleSearch}
        units={units}
        onUnitChange={handleUnitChange}
      />
      {weatherData && <WeatherInfo data={weatherData} />}
    </div>
  );
}

export default WeatherData;