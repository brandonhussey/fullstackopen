import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const api_key = process.env.REACT_APP_API_KEY;

  const [isLoading, setLoading] = useState(true);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        console.log("promise fulfilled");
        setWeather(response.data);
        setLoading(false);
      });
  }, [api_key, capital]);

  if (isLoading) {
    return <div>Loading weather data...</div>;
  }
  return (
    <div>
      <h3>Weather for {weather.name}</h3>
      <p>Conditions: {weather.weather[0].main}</p>
      <p>Temperature: {weather.main.temp} celcius</p>
      <p>Wind: {weather.wind.speed} KPH</p>
    </div>
  );
};

export default Weather;
