import { useState, useEffect } from "react";
import TodayForecast from "./TodayForecast";
import WeeklyForecast from "./WeeklyForecast";
import Charts from "./Charts";
import OtherCities from "./OtherCities";
import iconObj from "./iconobj";

const WeatherTab = ({ cityData, weatherData = [], otherCitiesData }) => {
  const [today, setToday] = useState([]);
  const [otherDays, setOtherdayS] = useState([]);
  const API_KEY = "AIzaSyDhH06w2lPWiAmL5xVua5qR46NqTORl6PY";
  const mapURL = `

  https://maps.googleapis.com/maps/api/staticmap?key=${API_KEY}&center=${cityData?.coord.lat},${cityData?.coord.lon}&scale=2&center=0,0&zoom=1&format=png&markers=${otherCitiesData[1]?.name}&maptype=roadmap&style=element:geometry%7Ccolor:0x1d2c4d&style=element:labels%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x8ec3b9&style=element:labels.text.stroke%7Ccolor:0x1a3646&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative.country%7Celement:geometry.stroke%7Ccolor:0x4b6878&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0x64779e&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:administrative.province%7Celement:geometry.stroke%7Ccolor:0x4b6878&style=feature:landscape.man_made%7Celement:geometry.stroke%7Ccolor:0x334e87&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0x023e58&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0x283d6a&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x6f9ba5&style=feature:poi%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0x023e58&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x3C7680&style=feature:road%7Cvisibility:off&style=feature:road%7Celement:geometry%7Ccolor:0x304a7d&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:road%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:road.highway%7Celement:geometry%7Ccolor:0x2c6675&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x255763&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xb0d5ce&style=feature:road.highway%7Celement:labels.text.stroke%7Ccolor:0x023e58&style=feature:transit%7Cvisibility:off&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:transit%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:transit.line%7Celement:geometry.fill%7Ccolor:0x283d6a&style=feature:transit.station%7Celement:geometry%7Ccolor:0x3a4762&style=feature:water%7Celement:geometry%7Ccolor:0x0e1626&style=feature:water%7Celement:geometry.fill%7Ccolor:0x262428%7Cvisibility:on%7Cweight:1.5&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x4e6d70&size=480x360
        
  `;

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
                  icon={iconObj[day[0].weather[0].icon]}
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
      <section className="map-section">
        <h3>Global map</h3>
        <div className="map-img">
          {cityData ? <img src={mapURL} alt="map"></img> : null}
        </div>
      </section>
      <section className="cities-section">
        <div className="cities-header">
          <h3>Other large cities</h3>
        </div>
        {otherCitiesData
          ? otherCitiesData.map((city) => {
              return <OtherCities data={city} key={city.name} />;
            })
          : null}
      </section>
    </main>
  );
};
export default WeatherTab;
