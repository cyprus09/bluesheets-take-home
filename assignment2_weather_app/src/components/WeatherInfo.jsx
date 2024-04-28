import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faGaugeMed,
  faTemperature1,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

const WeatherInfo = ({ data }) => {
  // Function to convert UNIX timestamp to local date and time
  const convertTimeStamp = (timestamp, timezone) => {
    const convertTimezone = timezone / 3600;

    const date = new Date(timestamp * 1000);

    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(
        convertTimezone
      )}`,
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  };

  // Function to convert country code to country name
  const convertCountryCode = (country) => {
    let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(country);
  };

  return (
    <div className="weather_body">
      {/* Display city name and country */}
      <h1 className="weather_city">
        {data.name}, {convertCountryCode(data.sys.country)}
      </h1>
      {/* Display date and time */}
      <div className="weather_datetime">
        {convertTimeStamp(data.dt, data.timezone)}
      </div>
      {/* Display weather forecast */}
      <div className="weather_forecast">
        <p>{data.weather[0].main}</p>
      </div>
      {/* Display weather icon */}
      <div className="weather_icon">
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].main}
        />
      </div>
      {/* Display current temperature */}
      <p className="weather_temperature">{data.main.temp.toFixed()}°</p>
      {/* Display min and max temperatures */}
      <div className="weather_minmax">
        <p>Min: {data.main.temp_min.toFixed()}°</p>
        <p>Max: {data.main.temp_max.toFixed()}°</p>
      </div>
      {/* Display additional weather information */}
      <div className="weather_info">
        {/* Weather card for "Real Feel" */}
        <div className="weather_card">
          <FontAwesomeIcon className="icons" icon={faTemperature1} />
          <div>
            <p>Real Feel</p>
            <p className="weather_realfeel">
              {data.main.feels_like.toFixed()}°
            </p>
          </div>
        </div>
        {/* Weather card for "Humidity" */}
        <div className="weather_card">
          <FontAwesomeIcon className="icons" icon={faDroplet} />
          <div>
            <p>Humidity</p>
            <p className="weather_humidity">{data.main.humidity}%</p>
          </div>
        </div>
        {/* Weather card for "Wind" */}
        <div className="weather_card">
          <FontAwesomeIcon className="icons" icon={faWind} />
          <div>
            <p>Wind</p>
            {/* Display wind speed with appropriate unit */}
            <p className="weather_wind">
              {data.wind.speed} {data.units === "imperial" ? "mph" : "m/s"}
            </p>
          </div>
        </div>
        {/* Weather card for "Pressure" */}
        <div className="weather_card">
          <FontAwesomeIcon className="icons" icon={faGaugeMed} />
          <div>
            <p>Pressure</p>
            <p className="weather_pressure">{data.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
