const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Turns a response into either JSON data or a categorized error,
// so both fetch functions below can share the same error handling.
async function handleResponse(res) {
  if (res.status === 404) {
    throw new Error('CITY_NOT_FOUND');
  }
  if (!res.ok) {
    throw new Error('SERVER_ERROR');
  }
  return res.json();
}

// fetch() only throws on network failure, so anything that isn't already
// one of our known error types gets relabeled as a network error here.
function asKnownError(err) {
  if (err.message === 'CITY_NOT_FOUND' || err.message === 'SERVER_ERROR') {
    return err;
  }
  return new Error('NETWORK_ERROR');
}

export async function fetchWeatherByCity(city) {
  try {
    const res = await fetch(`${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
    return await handleResponse(res);
  } catch (err) {
    throw asKnownError(err);
  }
}

export async function fetchWeatherByCoords(lat, lon) {
  try {
    const res = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    return await handleResponse(res);
  } catch (err) {
    throw asKnownError(err);
  }
}
