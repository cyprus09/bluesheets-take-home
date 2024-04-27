import React, { useState, useEffect } from "react";
import WeatherSearch from "./WeatherSearch";
import WeatherInfo from "./WeatherInfo";

const API_KEY = "ac6e72010b51f637c8f6d23e6989868a";

function App() {
  const [currCity, setCurrCity] = useState("London");
  const [units, setUnits] = useState("metric");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const url =  `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getWeather();
  }, [currCity, units]); 

  const handleSearch = (newCity) => {
    setCurrCity(newCity);
  };

  const handleUnitChange = (newUnit) => {
    setUnits(newUnit);
  };

  return (
    <div className="container">
      <WeatherSearch onSearch={handleSearch} units={units} onUnitChange={handleUnitChange} />
      {weatherData && <WeatherInfo data={weatherData} />}
    </div>
  );
}

export default App;