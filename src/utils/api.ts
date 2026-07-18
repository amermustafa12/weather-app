import type { OpenWeatherResponse } from '../types/weather';

// Turns a response into either JSON data or a categorized error,
// so both fetch functions below can share the same error handling.
async function handleResponse(res: Response): Promise<OpenWeatherResponse> {
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
function asKnownError(err: unknown): Error {
  if (err instanceof Error && (err.message === 'CITY_NOT_FOUND' || err.message === 'SERVER_ERROR')) {
    return err;
  }
  return new Error('NETWORK_ERROR');
}

export async function fetchWeatherByCity(city: string): Promise<OpenWeatherResponse> {
  try {
    const res = await fetch(`/.netlify/functions/weather?city=${encodeURIComponent(city)}`);
    return await handleResponse(res);
  } catch (err) {
    throw asKnownError(err);
  }
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<OpenWeatherResponse> {
  try {
    const res = await fetch(`/.netlify/functions/weather?lat=${lat}&lon=${lon}`);
    return await handleResponse(res);
  } catch (err) {
    throw asKnownError(err);
  }
}