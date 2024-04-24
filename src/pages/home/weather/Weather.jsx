import React, { useState } from 'react'
import './Weather.css'

const Weather = () => {
   
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState();
    const [unit, setUnit] = useState('metric'); // Default to Celsius
    const API_KEY = '6557810176c36fac5f0db536711a6c52'; // Add your OpenWeatherMap API key here

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&APPID=${API_KEY}`);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className='container'>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeatherData}>Search</button>
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                <option value="metric">Celsius</option>
                <option value="imperial">Fahrenheit</option>
            </select>

            


            {weatherData && (
                <div>

<div className="widgetWrapCurrent">
                <div className='widgetWeatherIcon'>
                    sunny
                    cloudy
                    raining
                </div>
                <div className="widgetWeatherToday">
                    <span>Today</span>
                    <h1>Islamabad</h1>
                    <p>Temperature: 20°{unit}</p>
                    <p>{weatherData.list.weather.description}</p>
                </div>
            </div>

            <div className='widgetWrapNext'>
            {weatherData.list.map((item, index) => (
                <div className='widgetWrapNextSingle'>
                    <h4>Friday</h4>
                    <span>25°</span>
                </div>
                ))}
            </div>


                    <h2>{weatherData.city.name}</h2>
                    <ul>
                        {weatherData.list.map((item, index) => (
                            <li key={index}>
                                {item.dt_txt}: {item.main.temp}°{unit === 'metric' ? 'C' : 'F'}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Weather