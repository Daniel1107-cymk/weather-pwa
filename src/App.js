import React, { useState } from "react";

import { fetchWeather } from "./api/fetchWeather";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const search = async (e) => {
    if (e.key === "Enter") {
      setError("");
      setWeatherData(null);
      const data = await fetchWeather(city);
      if (data.main) {
        setWeatherData(data);
        console.log(data);
        setCity("");
      } else {
        setError(data.message);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-blue-500">
      <h1 className="text-3xl font-bold text-center">Weather App</h1>
      <div className="flex flex-wrap my-4 justify-center items-center">
        <input
          className="mr-2 mb-2 px-2 rounded"
          type="text"
          placeholder="Search..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={search}
        />
      </div>
      {weatherData !== null && (
        <>
          <div className="flex flex-row">
            <p className="text-xl font-bold text-center">{weatherData.name}</p>
            <p className="text-sm font-bold bg-amber-600 rounded-xl px-2 mb-2 ml-1">
              {weatherData.sys.country}
            </p>
          </div>
          <div className="text-center text-xl font-bold">
            {weatherData.main.temp}°C
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <p className="text-center text-xl font-bold">
              {weatherData.weather[0].description}
            </p>
          </div>
        </>
      )}
      {error && (
        <div className="text-center font-bold text-red-500">{error}</div>
      )}
    </div>
  );
};

export default App;
