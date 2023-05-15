import { useState, useEffect } from "react";
import iconObj from "./iconobj";
const OtherCities = ({ data }) => {
  const [weatherData, setWeatherData] = useState([]);
  const API_KEY = import.meta.env.REACT_APP_API_KEY;

  useEffect(() => {
    fetchWeatherData();
  }, []);

  async function fetchWeatherData() {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${API_KEY}&units=metric`
    );
    const json = await res.json();
    setWeatherData([json]);
  }

  return (
    <>
      {weatherData.map((data) => (
        <div className="cities-container fs-300 margin-bottom-500">
          <div>
            <p className="text-neutral-dm">{data.city.country}</p>
            <p className="fs-400 fw-semibold">{data.city.name}</p>
            <p className="fw-regular">{data.list[0].weather[0].description}</p>
          </div>
          <div>
            <img
              src={iconObj[data.list[0].weather[0].icon]}
              alt={data.list[0].weather[0].description}
            />
            <p className="center fs-400 fw-bold">
              {Math.round(data.list[0].main.temp)}°C
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default OtherCities;
