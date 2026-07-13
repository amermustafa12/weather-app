import { useState, useEffect, useCallback } from 'react';
import { fetchWeatherByCity, fetchWeatherByCoords } from '../utils/api';
import { mapWeatherData } from '../utils/weatherMapper';

const LAST_CITY_KEY = 'lastCity';

const ERROR_MESSAGES = {
  CITY_NOT_FOUND: 'City not found, please check the spelling!',
  SERVER_ERROR: 'Something went wrong on the server, please try again later.',
  NETWORK_ERROR: 'Network error, please check your internet connection.',
};

export default function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('C');

  const applyWeatherData = (data) => {
    setWeather(mapWeatherData(data));
    setError('');
    localStorage.setItem(LAST_CITY_KEY, data.name);
  };

  const handleError = (err) => {
    setWeather(null);
    setError(ERROR_MESSAGES[err.message] || 'Something went wrong, please try again.');
  };

  const searchCity = useCallback(async (cityName) => {
    const target = cityName.trim();
    if (!target) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    try {
      const data = await fetchWeatherByCity(target);
      applyWeatherData(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchByCoords = useCallback(async (lat, lon) => {
    setLoading(true);
    try {
      const data = await fetchWeatherByCoords(lat, lon);
      applyWeatherData(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const useCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        searchByCoords(latitude, longitude);
      },
      (geoError) => {
        setLoading(false);
        if (geoError.code === geoError.PERMISSION_DENIED) {
          setError('Location permission denied. Please allow access and try again.');
        } else if (geoError.code === geoError.POSITION_UNAVAILABLE) {
          setError('Your location is unavailable right now, please try again.');
        } else if (geoError.code === geoError.TIMEOUT) {
          setError('Location request timed out, please try again.');
        } else {
          setError('Could not get your location.');
        }
      },
      { timeout: 10000 }
    );
  }, [searchByCoords]);

  const resetSearch = useCallback(() => {
    setWeather(null);
    setError('');
    localStorage.removeItem(LAST_CITY_KEY);
  }, []);

  // On first load, pick up wherever the user left off last time.
  useEffect(() => {
    const savedCity = localStorage.getItem(LAST_CITY_KEY);
    if (savedCity) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- fetching on mount is expected here
      searchCity(savedCity);
    }
    // only ever run once, on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    weather,
    loading,
    error,
    unit,
    setUnit,
    searchCity,
    useCurrentLocation,
    resetSearch,
  };
}
