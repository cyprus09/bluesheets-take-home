import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const WeatherSearch = ({ onSearch, units, onUnitChange }) => {
  // State variable to store the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
  };

  //Function to handle unit change
  const handleUnitClick = (newUnit) => {
    onUnitChange(newUnit);
  };

  return (
    <div className="weather_header">
      <form className="weather_search" onSubmit={handleSubmit}>
        <div className="weather_search-container">
          {/* Input field for city search */}
          <input
            type="text"
            placeholder="   Search for a city..."
            className="weather_searchform"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
        </div>
      </form>

      {/* Unit selection */}
      <div className="weather_units">
        {/* Celsius unit */}
        <span
          onClick={() => handleUnitClick("metric")}
          className={`weather_units ${
            units === "metric" ? "active" : ""
          }`}
        >
          °C
        </span>
        {/* Fahrenheit unit */}
        <span
          onClick={() => handleUnitClick("imperial")}
          className={`weather_units ${
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
