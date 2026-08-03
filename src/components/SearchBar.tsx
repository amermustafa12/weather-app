import type { ChangeEvent, KeyboardEvent } from 'react';

interface SearchBarProps {
  city: string;
  onCityChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onReset: () => void;
  onLocate: () => void;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.35-4.35" />
    </svg>
  );
}

export default function SearchBar({ city, onCityChange, onKeyDown, onSearch, onReset, onLocate }: SearchBarProps) {
  return (
    <div className="buttons">
      <input
        type="text"
        className="cityInput"
        placeholder="Enter city name"
        value={city}
        onChange={onCityChange}
        onKeyDown={onKeyDown}
        aria-label="City name"
      />
      <button className="search" onClick={onSearch} aria-label="Search">
        <SearchIcon />
        <span>Search</span>
      </button>
      <button className="reset" onClick={onReset}>
        Reset
      </button>
      <button className="location" onClick={onLocate} aria-label="Use current location">
        <img src="/images/location-dark.svg" alt="" />
        <span>Current Location</span>
      </button>
    </div>
  );
}
