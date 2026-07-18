import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const city = event.queryStringParameters?.city;
  const lat = event.queryStringParameters?.lat;
  const lon = event.queryStringParameters?.lon;
  
  const API_KEY = process.env.VITE_API_KEY; 
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  let fetchUrl = '';

  if (city) {
    fetchUrl = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  } else if (lat && lon) {
    fetchUrl = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  } else {
    return { statusCode: 400, body: 'Missing parameters' };
  }

  try {
    const response = await fetch(fetchUrl);
    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'Failed to fetch weather data' }) 
    };
  }
};