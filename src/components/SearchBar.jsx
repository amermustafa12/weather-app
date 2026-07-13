export default function SearchBar({ city, onCityChange, onKeyDown, onSearch, onReset, onLocate }) {
  return (
    <div className="buttons">
      <input
        type="text"
        className="cityInput"
        placeholder="Enter city name"
        value={city}
        onChange={onCityChange}
        onKeyDown={onKeyDown}
      />
      <button className="search" onClick={onSearch}>search</button>
      <button className="reset" onClick={onReset}>reset</button>
      <button className="location" onClick={onLocate} aria-label="Use current location">
        <img src="images/location-dark.svg" alt="" />
      </button>
    </div>
  );
}
