import { DateTime } from "luxon";
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";

function TemperatureDetails({ data, units }) {
  const formatToLocalTime = (unixTimestamp, timezone) => {
    const unixMilliseconds = unixTimestamp * 1000;
    const dateTime = DateTime.fromMillis(unixMilliseconds, {
      zone: "UTC",
    }).plus({ seconds: timezone });
    // Format the time in 12-hour format with AM/PM indication without seconds
    const formattedTime = dateTime.toFormat("hh:mm a");
    return formattedTime;
  };

  const tempUnit = units === "metric" ? "°C" : "°F";
  const windSpeedUnit = units === "metric" ? "m/s" : "m/h";
  const windSpeed =
    units === "metric" ? data.wind.speed : (data.wind.speed * 2.237).toFixed(1);

  return (
    <div className="temp-section">
      <p className="temp-condition">{data.weather[0].main}</p>

      <div className="temp-main">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="weather_condition_icon"
          className="temp-icon"
        />
        <p className="temp-value">
          {Math.round(data.main.temp)}
          {tempUnit}
        </p>
      </div>

      <div className="temp-metrics">
        <div className="metric">
          <UilTemperature size={20} />
          <span className="metric-label">Feels like</span>
          <span className="metric-value">
            {Math.round(data.main.feels_like)}
            {tempUnit}
          </span>
        </div>
        <div className="metric">
          <UilTear size={20} />
          <span className="metric-label">Humidity</span>
          <span className="metric-value">
            {Math.round(data.main.humidity)} %
          </span>
        </div>
        <div className="metric">
          <UilWind size={20} />
          <span className="metric-label">Wind</span>
          <span className="metric-value">
            {windSpeed} {windSpeedUnit}
          </span>
        </div>
      </div>

      <div className="temp-extra">
        <div className="extra-item">
          <UilSun size={16} />
          <span>
            Rise: {formatToLocalTime(data.sys.sunrise, data.timezone)}
          </span>
        </div>
        <div className="extra-item">
          <UilSunset size={16} />
          <span>
            Set: {formatToLocalTime(data.sys.sunset, data.timezone)}
          </span>
        </div>
        <div className="extra-item">
          <UilArrowUp size={16} />
          <span>
            High: {Math.round(data.main.temp_max)}
            {tempUnit}
          </span>
        </div>
        <div className="extra-item">
          <UilArrowDown size={16} />
          <span>
            Low: {Math.round(data.main.temp_min)}
            {tempUnit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TemperatureDetails;
