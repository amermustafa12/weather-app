// The shape our components actually use, after mapping the raw API response.
export interface WeatherData {
  cityName: string;
  tempC: number;
  description: string;
  subDescription: string;
  feelsLikeC: number;
  humidity: number;
  windSpeed: number;
  dateTimeText: string;
}

// Minimal shape of the OpenWeatherMap "current weather" response —
// only the fields this app actually reads.
export interface OpenWeatherResponse {
  name: string;
  timezone: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: { main: string; description: string }[];
  wind: { speed: number };
}

export type TemperatureUnit = 'C' | 'F';
