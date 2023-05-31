const WeeklyForecast = ({ data, icon }) => {
  const dayObj = {
    0: "Mon",
    1: "Tue",
    2: "Wed",
    3: "Thu",
    4: "Fri",
    5: "Sat",
    6: "Sun",
  };

  return (
    <div className="flex grow flex-col items-center justify-around gap-4 rounded-3xl bg-[#1f1f1f]">
      <div>{dayObj[new Date(data[0].dt_txt).getDay()]}</div>
      <img src={icon} />
      <div>{Math.round(data[0].main.temp)} °C</div>
    </div>
  );
};

export default WeeklyForecast;
