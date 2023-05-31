import { useState, useEffect } from "react";
import CitiesAndMap from "./CitiesAndMap";
import Forecast from "./Forecast";
import Charts from "./Charts";
import SearchButton from "./SearchButton";

const WeatherTab = ({ cityData, weatherData = [], otherCitiesData }) => {
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [today, setToday] = useState([]);
  const [otherDays, setOtherdayS] = useState([]);
  const API_KEY = import.meta.env.REACT_APP_API_KEY;

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
          // 8 den azsa sonraki günden tamamla
          todayArr.push(...item);
          for (let i = 0; i < data[index + 1].length - item.length; i++) {
            todayArr.push(data[index + 1][i]);
          }
        } else {
          // 8 ise tüm datayı at
          todayArr.push(...item);
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

  return (
    <main className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-[3fr_1fr]">
      <Forecast today={today} otherDays={otherDays} />
      <section>
        <h3>Chance of rain</h3>
        <Charts today={today} />
      </section>
      <CitiesAndMap
        data={otherCitiesData}
        cityData={cityData}
        weather={citiesWeather}
      />
      <SearchButton />
    </main>
  );
};
export default WeatherTab;
