import { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import './App.css';
import useWeather from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherIcon from './components/WeatherIcon';
import Spinner from './components/Spinner';
import DetailCard from './components/DetailCard';
import { PressureIcon, VisibilityIcon, SunriseIcon, SunsetIcon } from './components/DetailIcons';
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
        <div className="header-text">
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
            <div className="hero">
              <WeatherIcon condition={weather.description} className="icon" />

              <div className="temp">
                <p className="tempValue">{displayTemp(weather.tempC)}°</p>
                <p className="desc">{weather.description}</p>
                <p className="sub-desc">{weather.subDescription}</p>

                <div className="unit-toggle" role="group" aria-label="Temperature unit">
                  <button
                    className={unit === 'C' ? 'unitBtn active' : 'unitBtn'}
                    onClick={() => setUnit('C')}
                    aria-pressed={unit === 'C'}
                  >
                    °C
                  </button>
                  <button
                    className={unit === 'F' ? 'unitBtn active' : 'unitBtn'}
                    onClick={() => setUnit('F')}
                    aria-pressed={unit === 'F'}
                  >
                    °F
                  </button>
                </div>
              </div>
            </div>

            <ul className="weather-info">
              <DetailCard
                icon={<img src="/images/feels-like.svg" alt="" />}
                label="Feels like"
                value={`${displayTemp(weather.feelsLikeC)}°${unit}`}
              />
              <DetailCard
                icon={<img src="/images/humidity.svg" alt="" />}
                label="Humidity"
                value={`${weather.humidity}%`}
              />
              <DetailCard
                icon={<img src="/images/wind.svg" alt="" />}
                label="Wind"
                value={`${weather.windSpeed} km/h`}
              />
              <DetailCard icon={<PressureIcon />} label="Pressure" value={`${weather.pressure} hPa`} />
              <DetailCard icon={<VisibilityIcon />} label="Visibility" value={`${weather.visibilityKm} km`} />
              <DetailCard icon={<SunriseIcon />} label="Sunrise" value={weather.sunrise} />
              <DetailCard icon={<SunsetIcon />} label="Sunset" value={weather.sunset} />
            </ul>
          </>
        )}

        {!loading && !weather && <p className="placeholder">No weather data yet — search for a city above.</p>}
      </div>
    </div>
  );
}
