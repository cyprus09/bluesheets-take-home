import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faGaugeMed,
  faTemperature1,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

const WeatherInfo = ({ data, lat, lon, units }) => {
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

  const convertCountryCode = (country) => {
    let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(country);
  };

  return (
    <div className="weather__body">
      <h1 className="weather__city">
        {data.name}, {convertCountryCode(data.sys.country)}
      </h1>
      <div className="weather__datetime">
        {convertTimeStamp(data.dt, data.timezone)}
      </div>
      <div className="weather__forecast">
        <p>{data.weather[0].main}</p>
      </div>
      <div className="weather__icon">
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].main}
        />
      </div>
      <p className="weather__temperature">{data.main.temp.toFixed()}&#176;</p>
      <div className="weather__minmax">
        <p>Min: {data.main.temp_min.toFixed()}&#176;</p>
        <p>Max: {data.main.temp_max.toFixed()}&#176;</p>
      </div>
      <div className="weather__info">
        <div className="weather__card">
          <FontAwesomeIcon className="icons" icon={faTemperature1} />
          <div>
            <p>Real Feel</p>
            <p className="weather__realfeel">
              {data.main.feels_like.toFixed()}&#176;
            </p>
          </div>
        </div>
        <div className="weather__card">
          <FontAwesomeIcon className="icons" icon={faDroplet} />
          <div>
            <p>Humidity</p>
            <p className="weather__humidity">{data.main.humidity}%</p>
          </div>
        </div>
        <div className="weather__card">
          <FontAwesomeIcon className="icons" icon={faWind} />
          <div>
            <p>Wind</p>
            <p className="weather__wind">
              {data.wind.speed} {data.units === "imperial" ? "mph" : "m/s"}
            </p>
          </div>
        </div>
        <div className="weather__card">
          <FontAwesomeIcon className="icons" icon={faGaugeMed} />
          <div>
            <p>Pressure</p>
            <p className="weather__pressure">{data.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;