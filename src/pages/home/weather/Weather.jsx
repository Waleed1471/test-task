import React, { useState, useEffect, useRef } from "react";
import "./Weather.css";
import cities from "cities.json";
import { VariableSizeList as List } from "react-window";

const Weather = () => {
  const listRef = useRef(null);

  const [locationData, setLocationData] = useState({
    filteredCities: [],
    city: {
      name: "",
      latitude: "",
      longitude: "",
    },
  });
  const [showList, setShowList] = useState(false);
  const [weatherData, setWeatherData] = useState();
  const [unit, setUnit] = useState("metric");

  const fetchWeatherData = async () => {
    try {
      const { latitude, longitude } = locationData.city;
      console.log(latitude, longitude);
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=33.7215&longitude=73.0433&current=temperature_2m,precipitation,rain,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo&models=best_match`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (listRef.current && !listRef.current.contains(event.target)) {
      setShowList(false);
    }
  };

  const filterAndFindCity = (e) => {
    const { value } = e.target;
    value == "" ? setShowList(false) : setShowList(true);
    const resultCity = cities.filter((city) =>
      city.name.toLowerCase().includes(value.toLowerCase().trim())
    );
    setLocationData({
      ...locationData,
      filteredCities: resultCity,
      city: { ...locationData.city, name: value },
    });
  };
  const handleCitySelect = (city) => {
    setShowList(false);
    setLocationData({
      ...locationData,
      city: {
        name: city.name,
        latitude: city.lat,
        longitude: city.lng,
      },
    });
    fetchWeatherData();
  };

  const Row = ({ index, style }) => (
    <div
      key={locationData.filteredCities[index].id}
      value={locationData.filteredCities[index].name}
      style={style}
      className="cityItem"
      onClick={() => handleCitySelect(locationData.filteredCities[index])}
    >
      {locationData.filteredCities[index].name}
    </div>
  );

  return (
    <div className="container">
        <h1 className="text-center">Weather API</h1>
      <div className="searchWidget">
        <div className="cityInput-Wrapper" ref={listRef}>
          <input
            type="text"
            value={locationData.city.name}
            placeholder="Enter city name"
            onChange={filterAndFindCity}
            onClick={() => setShowList(true)}
          />
          <List
            className={`CitiesList ${!showList ? "d-none" : ""}`}
            height={200}
            itemCount={locationData.filteredCities.length}
            itemSize={() => 25} // Return the height of each option
            width={"100%"}
          >
            {Row}
          </List>
        </div>
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="metric">Celsius</option>
          <option value="imperial">Fahrenheit</option>
        </select>
      </div>
      {weatherData && (
        <div>
          <div className="widgetWrapCurrent">
            <div className="widgetWeatherIcon">
                <img src="/assets/images/sun_icon.svg" alt="" />
            </div>
            <div className="widgetWeatherToday">
              <span>Today</span>
              <h1>Islamabad</h1>
              <p><strong>Temperature</strong>: 20°</p>
              <p>clear sky</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
