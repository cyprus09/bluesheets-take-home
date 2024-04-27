import React, { useState } from "react";
import axios from "axios";

const WeatherData = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ac6e72010b51f637c8f6d23e6989868a`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };
  return (
    <div className="container">
      <div className="search">
        <input
          value={location}
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder="enter location"
        />
      </div>
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temperature">
          {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
        </div>
        <div className="description">
          {data.main ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>

      {data.name != undefined && (
        <div className="bottom">
          <div className="feels">
            {data.main ? (
              <p className="bold">{data.main.feels_like.toFixed()} °C</p>
            ) : null}
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity} %</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed} km/h</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherData;
