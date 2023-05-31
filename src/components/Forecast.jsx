import TodayForecast from "./TodayForecast";
import WeeklyForecast from "./WeeklyForecast";
import iconObj from "./iconobj";
const Forecast = ({ today = [], otherDays }) => {
  return (
    <section className="flex flex-col gap-4 md:flex-row ">
      <TodayForecast data={today} icon={iconObj} />
      <div className="flex grow gap-4">
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
  );
};

export default Forecast;
