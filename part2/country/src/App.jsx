import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(Object.values(response.data));
        console.log(countries);
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
      <div>
        {filtered.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}
        {filtered.length <= 10 &&
          filtered.length > 1 &&
          filtered.map((country) => {
            return <p key={country.name.common}>{country.name.common}</p>;
          })}
        {filtered.length == 1 && (
          <div>
            <h1>{filtered[0].name.common}</h1>
            <p>Capital {filtered[0].capital?.[0] ?? "N/A"}</p>
            <p>Area {filtered[0].area}</p>
            <h2>Languages</h2>
            <ul>
              {Object.values(filtered[0].languages).map((l) => {
                return <li key={l}>{l}</li>;
              })}
            </ul>
            <img
              src={filtered[0].flags["png"]}
              alt={filtered[0].flags["alt"]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
