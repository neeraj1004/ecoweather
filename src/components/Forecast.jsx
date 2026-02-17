import { DateTime } from "luxon";

function Forecast({ data, units }) {
  const formatToLocalTime = (unixTimestamp, timezone) => {
    // Convert Unix timestamp to a Luxon DateTime object
    const dateTime = DateTime.fromMillis(unixTimestamp * 1000);
    
    // Format the time in 12-hour format with AM/PM indication
    const formattedTime = dateTime.toFormat("hh:mm a");
    
    // Get current date for comparison
    const now = DateTime.now();
    
    // Format the date as "Today" if it's the current day or as "EEE, dd" for other days
    const formattedDate = dateTime.hasSame(now, 'day')
      ? "Today"
      : dateTime.toFormat("EEE, dd");
      
    return { formattedTime, formattedDate };
  };

  const tempUnit = units === "metric" ? "°C" : "°F";

  return (
    <div className="forecast-section">
      <div className="forecast-header">
        <h3>Upcoming hours</h3>
        <p>Next 12 forecast points</p>
      </div>
      <div className="forecast-grid">
        {data.list.slice(0, 12).map((item, idx) => {
          const { formattedTime, formattedDate } = formatToLocalTime(
            item.dt,
            data.city.timezone
          );
          return (
            <div className="forecast-card" key={idx}>
              <p className="forecast-date">{formattedDate}</p>
              <p className="forecast-time">{formattedTime}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="weather_condition_icon"
                className="forecast-icon"
              />
              <p className="forecast-temp">
                {Math.round(item.main.temp)}
                {tempUnit}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
