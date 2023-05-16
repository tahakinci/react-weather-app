import { useState, useEffect } from "react";
import TodayForecast from "./TodayForecast";
import WeeklyForecast from "./WeeklyForecast";
import Charts from "./Charts";
import iconObj from "./iconobj";
import CitiesAndMap from "./CitiesAndMap";

const WeatherTab = ({ cityData, weatherData = [], otherCitiesData }) => {
  const [today, setToday] = useState([]);
  const [otherDays, setOtherdayS] = useState([]);
  const [citiesWeather, setCitiesWeather] = useState([]);
  const API_KEY = import.meta.env.REACT_APP_API_KEY;
  useEffect(() => {
    setDays(convertData());
  }, [cityData]);

  useEffect(() => {
    getWeatherData();
  }, [otherCitiesData]);

  async function getWeatherData() {
    const arr = [];
    if (otherCitiesData) {
      for (const cities of otherCitiesData) {
        const { name } = cities;
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        arr.push(data);
      }
      setCitiesWeather(arr);
    }
  }

  function convertData() {
    const separatedDays = {};
    weatherData.map((item) => {
      const dateStr = item.dt_txt.split(" ")[0]; //API'daki dt_txt itemının tarih kısmını çekiyorum.
      const date = new Date(dateStr); // Her bir gün için bir date oluşturuyorum bunu daha sonra obj nin içinde property olarak kullanacağım.
      if (!separatedDays[date]) {
        separatedDays[date] = [];
      }
      separatedDays[date].push(item);
    });
    const arr = [];
    Object.entries(separatedDays).map((item) => {
      arr.push(item[1]);
    });
    return arr;
  }

  function setDays(data) {
    let todayArr = [];
    let otherDaysArr = [];
    data.map((item, index) => {
      // api dan 5 günlük veri geliyor. Ben bunları bugün ve diğer günler olarak ayırıyorum.
      // Tüm günler 8 item içeren arraylerden oluşurken genelde ilk ve son gün 8 itemdan oluşmuyor.
      // İlk günün eksiklerini 2. günün ilk indexleriyle, son günü ise sondan bir önceki günün son indexleriyle tamamlıyorum
      if (index === 0) {
        if (item.length < 8) {
          todayArr.push(...item);

          for (let i = 0; i < data[index + 1].length - item.length; i++) {
            todayArr.push(data[index + 1][i]);
          }
        }
      } else {
        otherDaysArr.push(item);
        if (index === 5) {
          const fifthItemsLen = item.length;
          const forthItemsLen = data[index - 1].length;
          for (let i = -1; i >= fifthItemsLen - forthItemsLen; i--) {
            otherDaysArr.at(-1).unshift(data[index - 1].at(i));
          }
        }
      }
    });
    setToday(todayArr);
    setOtherdayS(otherDaysArr);
  }

  return (
    <main className="main-content">
      <section className="weather-section">
        <div className="weather-header">
          <div className="left fs-600">
            <div className="padding-right-500 inline text-neutral-500">
              Today
            </div>
            <div className="padding-right-500 inline text-neutral-500">
              Tomorrow
            </div>
            <div className="padding-right-500 inline">Next 5 days</div>
          </div>
          <div className="weather-button right">
            <button className="text-dark-dm">Forecast</button>
            <button className="text-neutral-500">Air quality</button>
          </div>
        </div>
        <div className="forecast-container">
          <TodayForecast data={today} icon={iconObj} />
          {otherDays
            ? otherDays.map((day) => (
                <WeeklyForecast
                  data={day}
                  icon={iconObj[day[4].weather[0].icon]}
                  key={day.at(Math.floor(day.length / 2)).dt}
                />
              ))
            : null}
        </div>
      </section>
      <section className="chart-section">
        <h3>Chance of rain</h3>
        <Charts today={today} />
      </section>
      <CitiesAndMap
        data={otherCitiesData}
        cityData={cityData}
        weather={citiesWeather}
      />
    </main>
  );
};
export default WeatherTab;
