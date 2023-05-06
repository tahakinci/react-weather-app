import { useState, useEffect } from "react";
import TodayForecast from "./TodayForecast";
import WeeklyForecast from "./WeeklyForecast";

const iconObj = {
  "01d": "./icons/clear sky.png",
  "01n": "./icons/clear sky.png",
  "02d": "./icons/few clouds.png",
  "02n": "./icons/few clouds.png",
  "03d": "./icons/scattered clouds.png",
  "03n": "./icons/scattered clouds.png",
  "04d": "./icons/broken clouds.png",
  "04n": "./icons/broken clouds.png",
  "09d": "./icons/shower rain.png",
  "09n": "./icons/shower rain.png",
  "10d": "./icons/rain.png",
  "10n": "./icons/rain.png",
  "11d": "./icons/thunderstorm.png",
  "11n": "./icons/thunderstorm.png",
  "13d": "./icons/snow.png",
  "13n": "./icons/snow.png",
  "50d": "./icons/mist.png",
  "50n": "./icons/mist.png",
};

const WeatherTab = ({ cityData, weatherData = [] }) => {
  const [today, setToday] = useState([]);
  const [otherDays, setOtherdayS] = useState([]);

  useEffect(() => {
    setDays(convertData());
  }, [cityData]);

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
            <div className="padding-right-500 inline">Today</div>
            <div className="padding-right-500 inline">Tomorrow</div>
            <div className="padding-right-500 inline">Next 5 days</div>
          </div>
          <div className="right">
            <button>Forecast</button>
            <button>Air quality</button>
          </div>
        </div>
        <div className="forecast-container">
          <TodayForecast data={today} icon={iconObj} />
          {otherDays
            ? otherDays.map((day) => (
                <WeeklyForecast
                  data={day}
                  icon={iconObj[day[0].weather[0].icon]}
                  key={day.at(Math.floor(day.length / 2)).dt}
                />
              ))
            : null}
        </div>
      </section>
      <section className="chart-section">
        <h3>Chance of rain</h3>
      </section>
      <section className="map-section">
        <h3>Global map</h3>
      </section>
      <section className="cities-section">
        <h3>Other large cities</h3>
      </section>
    </main>
  );
};
export default WeatherTab;
