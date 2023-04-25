import { useState, useEffect } from "react";
import Forecast from "./Forecast";
import Hourly from "./Hourly";

const WeatherTab = ({ countryData, display }) => {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const API_KEY = import.meta.env.REACT_APP_API_KEY;

  useEffect(() => {
    fetchCurrentWeather();
    fetchHourlyWeather();
  }, []);
  // Current Weather data
  async function fetchCurrentWeather() {
    const [lat, lon] = countryData[0].latlng;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const json = await res.json();
    setCurrentWeather([json]);
  }
  // Hourly weather data
  async function fetchHourlyWeather() {
    const [lat, lon] = countryData[0].latlng;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=8`
    );
    const json = await res.json();
    setHourlyWeather(json.list); // data objet olarak geldiğinden ve map kullanmadığımda data henüz gelmeden forecast cmponentinde işlem yapmaya çalıştığımdan hata alıyordum
  }
  if (currentWeather.length) {
    return (
      <>
        <div className="blur-background"></div>
        <div className="forecast">
          <button onClick={display}>Return</button>
          {currentWeather.map((data) => (
            <Forecast
              temp={data.main.temp}
              max={data.main.temp_max}
              min={data.main.temp_min}
              desc={data.weather[0].description}
              city={countryData[0].capital[0]}
              wind={data.wind.speed}
              humidity={data.main.humidity}
              pressure={data.main.pressure}
              key={countryData[0].flag}
              icon={data.weather[0].icon}
            />
          ))}
          <div className="footer">
            {hourlyWeather.map((list) => (
              <Hourly
                temp={list.main.temp}
                time={list.dt_txt.substring(11, 16)}
                icon={list.weather[0].icon}
                key={list.dt_txt.substring(11, 16)}
              />
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return;
  }
};
export default WeatherTab;
