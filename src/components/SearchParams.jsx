import { useState, useEffect } from "react";
import WeatherTab from "./WeatherTab";
import Navigation from "./Navigation";

const SearchParams = () => {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [cities, setCities] = useState([]);
  const API_KEY = import.meta.env.REACT_APP_API_KEY;

  const apiKey = "2lsiKA7NMU1TTWqs9aO3tA==Pev5wchL6jPAMHhX";
  let apiUrl = `https://api.api-ninjas.com/v1/city?country=${weatherData?.city?.country}&limit=5`;

  useEffect(() => {
    fetchCities();
  }, [weatherData]);

  async function fetchCities() {
    try {
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();
      setCities(json);
    } catch (error) {
      console.error("There was a problem with the API request:", error);
    }
  }
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
      <Navigation
        setSearch={handleSearch}
        handleSubmit={handleSubmit}
        city={weatherData.city}
      />
      {weatherData ? (
        <WeatherTab
          cityData={weatherData.city}
          weatherData={weatherData.list}
          otherCitiesData={cities}
        />
      ) : null}
    </div>
  );
};

export default SearchParams;
