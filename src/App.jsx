import { useState } from 'react';
import Gauge from './components/Gauge';
import ReadoutBar from './components/ReadoutBar';
import { IconThermometer, IconHumidity, IconWind, IconLocation, IconSearch } from './components/icons';
import './App.css';

// NOTE: for a real deployment, move this key server-side or into an env
// variable so it isn't shipped in the client bundle. Kept inline here since
// this is a learning / portfolio project.
const API_KEY = '702199ae130477942968a69f0f7b722b';

export default function App() {
  // ----- state -----------------------------------------------------------
  const [city, setCity] = useState('');
  const [cityName, setCityName] = useState('Amman');
  const [dateTimeText, setDateTimeText] = useState('Tuesday, 3 February 2026 · 12:46 PM');
  const [tempValue, setTempValue] = useState(10);
  const [desc, setDesc] = useState('—');
  const [subDesc, setSubDesc] = useState('light intensity drizzle rain');
  const [feelsLike, setFeelsLike] = useState(10);
  const [humidity, setHumidity] = useState(93);
  const [windSpeed, setWindSpeed] = useState(6);
  const [status, setStatus] = useState('idle'); // idle | loading | empty | error

  // ----- data fetching -----------------------------------------------------
  const searchCity = () => {
    const searchTarget = city.trim();

    if (!searchTarget) {
      setStatus('empty');
      return;
    }

    setStatus('loading');

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchTarget)}&appid=${API_KEY}&units=metric`
    )
      .then((res) => {
        if (!res.ok) throw new Error('City not found');
        return res.json();
      })
      .then((data) => {
        setCityName(data.name);
        setTempValue(Math.round(data.main.temp));
        setDesc(data.weather[0].main);
        setSubDesc(data.weather[0].description);
        setFeelsLike(Math.round(data.main.feels_like));
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        setDateTimeText(getLocalTime(data.timezone));
        setCity('');
        setStatus('idle');
      })
      .catch(() => setStatus('error'));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') searchCity();
  };

  const getLocalTime = (timezoneOffsetInSeconds) => {
    const utcDate = new Date();
    const localDate = new Date(
      utcDate.getTime() + utcDate.getTimezoneOffset() * 60000 + timezoneOffsetInSeconds * 1000
    );
    const dateFmt = localDate.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const timeFmt = localDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return `${dateFmt} · ${timeFmt}`;
  };

  // ----- view --------------------------------------------------------------
  return (
    <div className="station">
      <div className="panel">
        <header className="panel-header">
          <div className="plate">
            <span className="plate-eyebrow">Meteorograph No. 01</span>
            <h1 className="plate-city">{cityName}</h1>
            <p className="plate-time">{dateTimeText}</p>
          </div>

          <div className="controls">
            <div className="search-slot">
              <input
                type="text"
                className="city-input"
                placeholder="Enter a city…"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="City name"
              />
              <button className="btn btn-search" onClick={searchCity} aria-label="Search">
                <IconSearch />
              </button>
            </div>
            <button className="btn btn-locate" aria-label="Use current location">
              <IconLocation />
            </button>
          </div>
        </header>

        {status === 'error' && (
          <p className="status-message" role="alert">
            City not found — check the spelling and try again.
          </p>
        )}
        {status === 'empty' && (
          <p className="status-message" role="alert">
            Enter a city name first.
          </p>
        )}

        <div className="readout-deck">
          <div className="gauge-column">
            <Gauge value={tempValue} min={-20} max={50} unit="°C" />
            <div className="condition">
              <h2 className="condition-title">{desc}</h2>
              <p className="condition-sub">{subDesc}</p>
            </div>
          </div>

          <div className="tape-column">
            <ReadoutBar
              icon={<IconThermometer />}
              label="Feels like"
              value={feelsLike}
              unit="°C"
              ratio={(feelsLike + 20) / 70}
            />
            <ReadoutBar icon={<IconHumidity />} label="Humidity" value={humidity} unit="%" ratio={humidity / 100} />
            <ReadoutBar icon={<IconWind />} label="Wind" value={windSpeed} unit=" m/s" ratio={windSpeed / 20} />
          </div>
        </div>

        <footer className="panel-footer">
          <span>Instrument calibrated for portfolio display</span>
          <span>Data via OpenWeatherMap</span>
        </footer>
      </div>
    </div>
  );
}
