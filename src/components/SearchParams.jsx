import { useState } from "react";
import WeatherTab from "./WeatherTab";
import Navigation from "./Navigation";

const SearchParams = () => {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const API_KEY = import.meta.env.REACT_APP_API_KEY;

  async function fetchWeatherData() {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${API_KEY}&units=metric`
    );
    const json = await res.json();
    setWeatherData(json);
  }

  const handleSearch = (value) => {
    setSearch(value);
  };
  const handleSubmit = () => {
    fetchWeatherData();
  };
  return (
    <div className="container bg-primary-500-dm">
      <Navigation setSearch={handleSearch} handleSubmit={handleSubmit} />
      {weatherData ? (
        <WeatherTab
          cityData={weatherData.city}
          weatherData={weatherData.list}
        />
      ) : null}
    </div>
  );
};

export default SearchParams;
