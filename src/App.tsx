import { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import './App.css';
import useWeather from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherIcon from './components/WeatherIcon';
import Spinner from './components/Spinner';
import { celsiusToFahrenheit } from './utils/convertTemp';

export default function App() {
  const [cityInput, setCityInput] = useState('');
  const { weather, loading, error, unit, setUnit, searchCity, useCurrentLocation, resetSearch } = useWeather();

  const handleSearch = () => {
    searchCity(cityInput);
    setCityInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleReset = () => {
    setCityInput('');
    resetSearch();
  };

  // temps are stored in Celsius, converted here for display only
  const displayTemp = (celsius: number) => (unit === 'C' ? celsius : celsiusToFahrenheit(celsius));

  return (
    <div className="container">
      <div className="top">
        <div>
          <h1>{weather ? weather.cityName : 'Search a city'}</h1>
          <p>{weather ? weather.dateTimeText : 'to see the weather'}</p>
        </div>

        <SearchBar
          city={cityInput}
          onCityChange={(e: ChangeEvent<HTMLInputElement>) => setCityInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onSearch={handleSearch}
          onReset={handleReset}
          onLocate={useCurrentLocation}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <div className="bottom">
        {loading && <Spinner />}

        {!loading && weather && (
          <>
            <div className="temp">
              <h1 className="tempValue">{displayTemp(weather.tempC)}</h1>
              <p className="desc">{weather.description}</p>
              <div>
                <button className={unit === 'C' ? 'unitBtn active' : 'unitBtn'} onClick={() => setUnit('C')}>
                  °C
                </button>{' '}
                |{' '}
                <button className={unit === 'F' ? 'unitBtn active' : 'unitBtn'} onClick={() => setUnit('F')}>
                  °F
                </button>
                <p>{weather.subDescription}</p>
              </div>
            </div>

            <div className="weather-icon">
              <WeatherIcon condition={weather.description} className="icon" />
              <ul className="weather-info">
                <li>
                  <img src="/images/feels-like.svg" alt="" />
                  Feels like: {displayTemp(weather.feelsLikeC)}°{unit}
                </li>
                <li>
                  <img src="/images/humidity.svg" alt="" />
                  Humidity: {weather.humidity}%
                </li>
                <li>
                  <img src="/images/wind.svg" alt="" />
                  Wind: {weather.windSpeed} km/h
                </li>
              </ul>
            </div>
          </>
        )}

        {!loading && !weather && <p className="placeholder">No weather data yet — search for a city above.</p>}
      </div>
    </div>
  );
}
