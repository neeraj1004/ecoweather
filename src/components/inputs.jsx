import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiURL, geoApiOptions } from "../services/GeoDBApi";
import "./inputs.css";

function Inputs({ onSearchChange, onUnitChange }) {
  const [search, setSearch] = useState(null);

  const [isMetric, setIsMetric] = useState(true);

  const handleUnitToggle = () => {
    const newUnit = isMetric ? "imperial" : "metric";
    setIsMetric(!isMetric);
    onUnitChange(newUnit);
  };

  const loadOptions = async (inputValue) => {
    return fetch(
      `${geoApiURL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const handleGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const geolocationData = {
        value: `${latitude} ${longitude}`,
        label: `Current Location`,
      };
      setSearch(geolocationData);
      onSearchChange(geolocationData);
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center my-5 gap-4">
      <div className="flex flex-row w-full sm:w-3/4 items-center justify-center space-x-4">
        <AsyncPaginate
          type="text"
          placeholder="Search..."
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
          className="custom-input"
        />
        <UilSearch
          size={25}
          className="cursor-pointer text-white transition ease-in-out hover:scale-110"
        />
        <UilLocationPoint
          size={25}
          className="cursor-pointer text-white transition ease-in-out hover:scale-110"
          onClick={handleGeolocation}
        />
      </div>
      <div className="flex flex-row w-full sm:w-1/4 items-center justify-center">
        <button
          onClick={handleUnitToggle}
          className="cursor-pointer text-white transition ease-in-out hover:scale-110 rounded-full py-1.5 px-2.5 shadow-lg border-white"
          style={{
            transition: "background-color 0.3s ease",
            boxShadow: isMetric ? "0 0 10px #9865B9" : "0 0 10px #2341AF",
          }}
        >
          {isMetric ? "°C" : "°F"}
        </button>
      </div>
    </div>
  );
}

export default Inputs;
