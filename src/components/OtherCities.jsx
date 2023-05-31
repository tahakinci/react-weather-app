import { useState, useEffect } from "react";
import iconObj from "./iconobj";
const OtherCities = ({ weatherData }) => {
  return (
    <>
      <div className="my-4 flex justify-between rounded-[2rem] bg-[#1f1f1f] p-4">
        <div>
          <p>{weatherData.city.country}</p>
          <p>{weatherData.city.name}</p>
          <p>{weatherData.list[0].weather[0].description}</p>
        </div>
        <div>
          <img
            src={iconObj[weatherData.list[0].weather[0].icon]}
            alt={weatherData.list[0].weather[0].description}
          />
          <p>{Math.round(weatherData.list[0].main.temp)}°C</p>
        </div>
      </div>
    </>
  );
};

export default OtherCities;
