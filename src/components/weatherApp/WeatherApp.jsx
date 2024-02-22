import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const WeatherApp = () => {
    const api_key = "551e7d69f0cd27b3e71eba0ac8a1f314"; 
    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput")[0];
        if (element.value === "") {
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&appid=${api_key}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            
            const data = await response.json();
            const humidity = data.main.humidity;
            const windSpeed = Math.floor(data.wind.speed);
            const temperature = Math.floor(data.main.temp - 273.15);
            const location = data.name;
            const weatherIcon = data.weather[0].icon;

            // Update UI with fetched data
            document.querySelector(".humidity-percent").innerHTML = `${humidity} %`;
            document.querySelector(".wind-rate").innerHTML = `${windSpeed} km/h`;
            document.querySelector(".weather-temp").innerHTML = `${temperature}°C`;
            document.querySelector(".weather-location").innerHTML = location;

            // Set weather icon based on weather condition
            switch (weatherIcon) {
                case "01d":
                case "01n":
                    setWicon(clear_icon);
                    break;
                case "02d":
                case "02n":
                case "03d":
                case "03n":
                    setWicon(cloud_icon);
                    break;
                case "04d":
                case "04n":
                    setWicon(drizzle_icon);
                    break;
                case "09d":
                case "09n":
                case "10d":
                case "10n":
                    setWicon(rain_icon);
                    break;
                case "13d":
                case "13n":
                    setWicon(snow_icon);
                    break;
                default:
                    setWicon(clear_icon);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Search' />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">20°C</div>
            <div className="weather-location">Brasília</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">79%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">3 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
