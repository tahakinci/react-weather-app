const Forecast = ({
  temp,
  max,
  min,
  desc,
  city,
  wind,
  humidity,
  pressure,
  icon,
}) => {
  return (
    <div className="current-weather">
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
      <p>{city}</p>
      <p>{temp} °C</p>
      <div>
        {max} °C / {min} °C
      </div>
      <p>{desc}</p>
      <div>
        {wind}
        {humidity}
        {pressure}
      </div>
    </div>
  );
};

export default Forecast;
