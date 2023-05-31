const Charts = ({ today }) => {
  // array of each day's rain prediction
  const predictionArr = today.map((day) => {
    if (day.rain) {
      // converting quantity of rain to chance of rain (%)
      return Math.round((day.rain["3h"] / 10) * 100);
    }
    return 0;
  });
  // array of each 3 hours in day (it may contain day before or day after depends on current hour)
  const hours = today.map((item) => {
    const date = new Date(item.dt * 1000);
    const time = date.toLocaleTimeString(["en-US"], {
      hour: "2-digit",
    });
    return time;
  });

  return (
    <div>
      <div>
        {predictionArr.map((day, index) => (
          <div key={index}>
            <div>
              <div style={{ height: day + "%" }}></div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {hours.map((hour) => (
          <div key={hour}>{hour}</div>
        ))}
      </div>
    </div>
  );
};

export default Charts;
