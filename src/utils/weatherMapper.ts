import { formatLocalTime, formatClockTime } from './formatLocalTime';
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
    pressure: data.main.pressure,
    visibilityKm: Math.round((data.visibility / 1000) * 10) / 10,
    sunrise: formatClockTime(data.sys.sunrise, data.timezone),
    sunset: formatClockTime(data.sys.sunset, data.timezone),
    dateTimeText: formatLocalTime(data.timezone),
  };
}
