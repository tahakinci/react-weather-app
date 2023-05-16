import { useState, useEffect } from "react";
import iconObj from "./iconobj";
const OtherCities = ({ weatherData }) => {
  return (
    <>
      <div className="cities-container fs-300 margin-bottom-500">
        <div>
          <p className="text-neutral-dm">{weatherData.city.country}</p>
          <p className="fs-400 fw-semibold">{weatherData.city.name}</p>
          <p className="fw-regular">
            {weatherData.list[0].weather[0].description}
          </p>
        </div>
        <div>
          <img
            src={iconObj[weatherData.list[0].weather[0].icon]}
            alt={weatherData.list[0].weather[0].description}
          />
          <p className="center fs-400 fw-bold">
            {Math.round(weatherData.list[0].main.temp)}°C
          </p>
        </div>
      </div>
    </>
  );
};

export default OtherCities;
