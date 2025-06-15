import { DateTime } from "luxon";

// const apiKey = "ce2629611acf0a137633afcc41623fae";
// const baseURL = "https://api.openweathermap.org/data/2.5";

// const getWeatherData = (infoType, searchParams) => {
//   const url = new URL(`${baseURL}/${infoType}`);
//   url.search = new URLSearchParams({ ...searchParams, appid: apiKey });

//   return fetch(url)
//     .then((res) => res.json())
//     .then((data) => data);
// };

// const formatCurrentWeather = (data) => {
//   const {
//     coord: { lat, lon },
//     main: { temp, feels_like, temp_min, temp_max, humidity },
//     name,
//     dt,
//     sys: { country, sunrise, sunset },
//     weather,
//     wind: { speed },
//   } = data;

//   const { main: details, icon } = weather[0];

//   return {
//     lat,
//     lon,
//     temp,
//     feels_like,
//     temp_min,
//     temp_max,
//     humidity,
//     name,
//     dt,
//     country,
//     sunrise,
//     sunset,
//     weather,
//     speed,
//     details,
//     icon,
//   };
// };

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const formatForecastWeather = (data) => {
  let { timezone, daily = [], hourly = [] } = data;

  daily = daily.slice(1, 6).map((d) => ({
    title: formatToLocalTime(d.dt, timezone, "ccc"),
    temp: d.temp.day,
    icon: d.weather[0].icon,
  }));

  hourly = hourly.slice(1, 6).map((d) => ({
    title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
    temp: d.temp.day,
    icon: d.weather[0].icon,
  }));

  return {
    timezone,
    daily,
    hourly,
  };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedData = await getWeatherData("weather", searchParams).then(
    formatCurrentWeather
  );

  const { lat, lon } = formattedData;
  const formattedForecastWeather = await getWeatherData("weather", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedData, ...formattedForecastWeather };
  // return formattedData;
};

export default getFormattedWeatherData;
