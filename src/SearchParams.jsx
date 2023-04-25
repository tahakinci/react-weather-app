import { useState, useEffect } from "react";
import WeatherTab from "./WeatherTab";

const SearchParams = () => {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState([]);
  const [displayForm, setDisplayForm] = useState(true);

  async function requestCountries() {
    const res = await fetch(`https://restcountries.com/v3.1/name/${search}`);
    const json = await res.json();
    setCountry(json);
  }

  const toggleDisplay = () => {
    setDisplayForm(!displayForm);
  };

  return (
    <div className="container">
      {displayForm ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            requestCountries();
            toggleDisplay();
          }}
        >
          <h2 className="form-text">Weather App</h2>
          <input
            name="country"
            placeholder="Please enter the country"
            onChange={(e) => setSearch(e.target.value)}
            className="input-box"
          />
          <button className="input-box">Submit</button>
        </form>
      ) : country.length && !displayForm ? (
        <WeatherTab countryData={country} display={toggleDisplay} />
      ) : null}
    </div>
  );
};

export default SearchParams;
