// import Navbar from "./components/Navbar";
import TimeAndDate from "./components/TimeAndDate";
import TemperatureDetails from "./components/TemperatureDetails";
import Forecast from "./components/Forecast";
import Inputs from "./components/inputs";
import { weatherApiKey, weatherBaseURL } from "./services/OpenWeatherApi";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [units, setUnits] = useState("metric");
  const [lastSearchData, setLastSearchData] = useState(null);

  const fetchWeatherData = (lat, lon, units, searchData) => {
    const currentWeatherFetch = fetch(
      `${weatherBaseURL}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=${units}`
    );
    const forecastFetch = fetch(
      `${weatherBaseURL}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=${units}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch(console.log);
  };

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    setLastSearchData(searchData);
    fetchWeatherData(lat, lon, units, searchData);
  };

  const handleUnitChange = (newUnits) => {
    setUnits(newUnits);
    if (lastSearchData) {
      const [lat, lon] = lastSearchData.value.split(" ");
      fetchWeatherData(lat, lon, newUnits, lastSearchData);
    }
  };

  return (
    <div className="mx-auto max-w-screen-md mt-3 py-2 px-4 sm:px-8 md:px-16 lg:px-32 bg-white bg-opacity-10 backdrop-blur-md rounded-lg drop-shadow-lg">
      {/* <Navbar /> */}
      <Inputs
        onSearchChange={handleOnSearchChange}
        onUnitChange={handleUnitChange}
      />
      {currentWeather && <TimeAndDate data={currentWeather} />}
      {currentWeather && (
        <TemperatureDetails data={currentWeather} units={units} />
      )}
      {forecast && <Forecast data={forecast} units={units} />}
    </div>
  );
}

export default App;
