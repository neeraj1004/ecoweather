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
    <div>
      <div className="flex items-center justify-center py-3 text-xl text-cyan-300">
        {data.weather[0].main}
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3 flex-wrap">
        <div className="flex items-center w-full sm:w-auto justify-center">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="weather_condition_icon"
            className="w-20"
          />
          <p className="text-3xl pl-8">
            {Math.round(data.main.temp)}
            {tempUnit}
          </p>
        </div>
        <div className="flex flex-col space-y-2 w-full sm:w-auto mt-4 sm:mt-0">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Real Feel:
            <span className="font-medium ml-1">
              {Math.round(data.main.feels_like)}
              {tempUnit}
            </span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">
              {Math.round(data.main.humidity)} %
            </span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">
              {windSpeed} {windSpeedUnit}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3 flex-wrap gap-y-2">
        <UilSun />
        <p className="font-light">
          Rise:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(data.sys.sunrise, data.timezone)}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilSunset />
        <p className="font-light">
          Set:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(data.sys.sunset, data.timezone)}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilSun />
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">
            {Math.round(data.main.temp_max)}
            {tempUnit}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilSun />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">
            {Math.round(data.main.temp_min)}
            {tempUnit}
          </span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureDetails;
