import React, { useState, useEffect, useRef } from "react";
import "./Weather.css";
import cities from "cities.json";
import { VariableSizeList as List } from "react-window";
import WeatherIcon from "../../../components/weatherIcon/WeatherIcon";

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
    const [errorMessage, setErrorMessage] = useState('');
    const [weatherData, setWeatherData] = useState({
        current: {},
        location: {}
    });
    const { current, location } = weatherData
    const [unit, setUnit] = useState("metric");
    const fetchWeatherData = async (city) => {
        try {
            const { latitude, longitude } = locationData.city;
            console.log(latitude, longitude);
            const response = await fetch(
                `${process.env.REACT_APP_WEATHER_API_URL}/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city.name}`
            );
            const data = await response.json();
            setErrorMessage('');
            if (!data.error) {
                setWeatherData(data);
            } else {
                setErrorMessage('Error! Location not found, Please select other location');
            }
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
            city.name.toLowerCase().trim().includes(value.toLowerCase().trim())
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
        fetchWeatherData(city);
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
            {errorMessage !== '' && <div className="d-flex align-center justify-center mt-2"><span className='errorStyles'>{errorMessage}</span></div>}
            {Object.keys(weatherData.current).length > 0 && Object.keys(weatherData.location).length > 0 && errorMessage === '' && (
                <div>
                    <div className="widgetWrapCurrent">
                        <div className="widgetWeatherIcon">
                            <WeatherIcon conditionText={current.condition?.text} />
                        </div>
                        <div className="widgetWeatherToday">
                            <span>Today</span>
                            <h1>{location.name}</h1>
                            <p>
                                <strong>Temperature</strong>:{" "}
                                {unit === "metric"
                                    ? current.feelslike_c + "°C"
                                    : current.feelslike_f + "°F"}
                            </p>
                            <p>{current.condition?.text}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
