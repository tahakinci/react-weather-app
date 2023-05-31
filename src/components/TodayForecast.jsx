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
      <div className="flex flex-col gap-5 rounded-3xl bg-transparent pb-5  md:bg-[#bbd8ec] md:text-black">
        <div className=" hidden justify-between rounded-t-3xl bg-[#adcade] p-4 text-2xl font-bold md:flex">
          <p>{dayObj[new Date().getDay()]}</p>
          <p>{time}</p>
        </div>
        <div className="flex flex-row items-center justify-between gap-4 px-4">
          <div>
            <p className="text-[6rem] font-bold leading-tight md:text-[2.5rem]">
              {Math.round(data[0].main.temp)}°C
            </p>
            <p className="block text-[2rem] font-light text-gray-400 md:hidden">
              {data[0].weather[0].description}
            </p>
          </div>
          <img
            src={icon[data[0].weather[0].icon]}
            alt=""
            className="w-[150px] object-contain md:max-w-[75px]"
          />
        </div>

        <div className="block gap-4 px-4  text-2xl md:flex md:text-xs">
          <div className="hidden flex-col md:flex">
            <p>
              <span className="text-white md:text-[#637583]">Real feel: </span>
              <span className="font-bold">
                {Math.round(data[0].main.feels_like)}°C
              </span>
            </p>
            <p>
              <span className="text-white md:text-[#637583]">min: </span>
              <span className="font-bold">
                {Math.round(data[0].main.temp_min)} °C
              </span>
            </p>
            <p>
              <span className="text-white md:text-[#637583]">max: </span>
              <span className="font-bold">
                {Math.round(data[0].main.temp_max)} °C
              </span>
            </p>
          </div>
          <div className="flex justify-evenly rounded-[2rem] bg-gray-800 p-6  md:flex-col md:bg-transparent md:p-0">
            <div className="block flex-row-reverse justify-end gap-1 text-center  md:flex">
              <div className="block md:hidden">
                <i className="fa-solid fa-wind "></i>
              </div>
              <p className="font-bold">{data[0].wind.speed} km/h</p>
              <p className="text-white md:text-[#637583]">Wind </p>
            </div>
            <div className="block flex-row-reverse justify-end gap-1 text-center  md:flex">
              <div className="block md:hidden">
                <i className="fa-solid fa-arrow-down-wide-short"></i>
              </div>
              <p className="font-bold">{data[0].main.pressure} MB</p>
              <p className="text-white md:text-[#637583]">Pressure </p>
            </div>
            <div className="block flex-row-reverse justify-end gap-1 text-center  md:flex">
              <div className="block md:hidden">
                <i className="fa-solid fa-droplet"></i>
              </div>
              <p className="font-bold">{data[0].main.humidity}%</p>
              <p className="text-white md:text-[#637583]">Humidty </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TodayForecast;
