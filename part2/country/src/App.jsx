import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Country from "./components/Country";
import CountryWithToggle from "./components/CountryWithToggle";
const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const api_key = import.meta.env.VITE_WEATHER_KEY;
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(Object.values(response.data));
        setLoading(false);
        // console.log(countries);
      });
  }, []);

  // Run filtering when value or countries changes
  useEffect(() => {
    if (!value || countries.length === 0) {
      setFiltered([]);
      return;
    }

    const matches = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(matches);
  }, [value, countries]);
  // if (!countries) {
  //   return null;
  // }
  // Handle input change
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      find countries <input value={value} onChange={onChange}></input>
      {loading ? (
        <p>Loading countries...</p>
      ) : (
        <div>
          {filtered.length > 10 && (
            <p>Too many matches, specify another filter</p>
          )}
          {filtered.length <= 10 &&
            filtered.length > 1 &&
            filtered.map((country) => {
              return (
                <CountryWithToggle
                  api_key={api_key}
                  key={country.name.common}
                  country={country}
                />
              );
            })}
          {filtered.length === 1 && (
            <Country api_key={api_key} country={filtered[0]} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
