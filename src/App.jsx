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
    <div className="app-root">
      <div className="app-card">
        <header className="app-header">
          <h1 className="app-title">Eco Weather</h1>
          <p className="app-subtitle">
            Search any city, switch units, and see today&apos;s details &amp;
            forecast.
          </p>
        </header>

        <div className="search-row">
          <Inputs
            onSearchChange={handleOnSearchChange}
            onUnitChange={handleUnitChange}
          />
        </div>

        {currentWeather ? (
          <>
            <TimeAndDate data={currentWeather} />
            <TemperatureDetails data={currentWeather} units={units} />
          </>
        ) : (
          <p className="empty-state">
            Start by searching for a city or use your current location to see
            live weather conditions.
          </p>
        )}

        {forecast && <Forecast data={forecast} units={units} />}
      </div>
    </div>
  );
}

export default App;
