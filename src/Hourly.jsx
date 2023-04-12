const Hourly = ({ temp, time, icon }) => {
  return (
    <div>
      <p>{time}</p>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
      <p>{temp}</p>
    </div>
  );
};

export default Hourly;
