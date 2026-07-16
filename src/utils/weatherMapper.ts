import { formatLocalTime } from './formatLocalTime';
import type { OpenWeatherResponse, WeatherData } from '../types/weather';

// Temperatures are kept in Celsius here; the UI converts to Fahrenheit
// on the fly so switching units never needs a new API call.
export function mapWeatherData(data: OpenWeatherResponse): WeatherData {
  return {
    cityName: data.name,
    tempC: Math.round(data.main.temp),
    description: data.weather[0].main,
    subDescription: data.weather[0].description,
    feelsLikeC: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    dateTimeText: formatLocalTime(data.timezone),
  };
}
