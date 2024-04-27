import './App.css';
import React, {useState} from 'react'
import axios from 'axios'
import WeatherData from './components/WeatherData';

function App() {
  return (
    <div className="App">
      <WeatherData/>
    </div>
  );
}

export default App;

{/*ac6e72010b51f637c8f6d23e6989868a*/}
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}