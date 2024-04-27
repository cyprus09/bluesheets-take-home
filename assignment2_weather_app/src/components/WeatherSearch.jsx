import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const WeatherSearch = ({ onSearch, units, onUnitChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
  };

  const handleUnitClick = (newUnit) => {
    onUnitChange(newUnit);
  };

  return (
    <div className="weather__header">
      <form className="weather__search" onSubmit={handleSubmit}>
        <div className="weather__search-container">
          <input
            type="text"
            placeholder="   Search for a city..."
            className="weather__searchform"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
        </div>
      </form>

      <div className="weather__units">
        <span
          onClick={() => handleUnitClick("metric")}
          className={`weather_unit_celsius ${
            units === "metric" ? "active" : ""
          }`}
        >
          °C
        </span>
        <span
          onClick={() => handleUnitClick("imperial")}
          className={`weather_unit_farenheit ${
            units === "imperial" ? "active" : ""
          }`}
        >
          °F
        </span>
      </div>
    </div>
  );
};

export default WeatherSearch;
