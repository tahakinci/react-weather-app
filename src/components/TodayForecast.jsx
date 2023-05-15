import { useState, useEffect } from "react";
const TodayForecast = ({ data, icon }) => {
  const [time, setTime] = useState("");

  const dayObj = {
    0: "Mon",
    1: "Tue",
    2: "Wed",
    3: "Thu",
    4: "Fri",
    5: "Sat",
    6: "Sun",
  };

  useEffect(() => {
    setInterval(hour, 1000);
  }, []);

  function hour() {
    const date = new Date();
    const time = date.toLocaleTimeString(["en-US"], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(time);
  }

  if (data.length) {
    return (
      <div className="bg-screen">
        <div className="bg-screen-header fs-600 fw-semibold">
          <p className="left ">{dayObj[new Date().getDay()]}</p>
          <p className="text-right">{time}</p>
        </div>
        <div className="bg-screen-content fs-200">
          <div>
            <p className="fs-800 fw-bold">{Math.round(data[0].main.temp)}°C</p>
            <p>
              <span className="text-semibright-dm">Real feel: </span>
              <span className="fw-bold">
                {Math.round(data[0].main.feels_like)}°C
              </span>
            </p>
            <p>
              <span className="text-semibright-dm">Wind: </span>
              <span className="fw-bold">{data[0].wind.speed} km/h</span>
            </p>
            <p>
              <span className="text-semibright-dm">pressure: </span>
              <span className="fw-bold">{data[0].main.pressure} MB</span>
            </p>
          </div>
          <div>
            <img src={icon[data[0].weather[0].icon]} alt="" />
            <p>
              <span className="text-semibright-dm">Humidty: </span>
              <span className="fw-bold">{data[0].main.humidity}%</span>
            </p>

            <p>
              <span className="text-semibright-dm">min: </span>
              <span className="fw-bold">
                {Math.round(data[0].main.temp_min)} °C
              </span>
            </p>
            <p>
              <span className="text-semibright-dm">max: </span>
              <span className="fw-bold">
                {Math.round(data[0].main.temp_max)} °C
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default TodayForecast;
