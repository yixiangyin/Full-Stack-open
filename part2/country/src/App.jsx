import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState(null);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(Object.values(response.data));
        console.log(countries);
      });
  }, []);

  if (!countries) {
    return null;
  }
  const onChange = (event) => {
    setValue(event.target.value);
    const matches = countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setFiltered(matches);
    console.log("matches", matches);
    console.log("matches length", matches.length);
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
            <p>Capital {filtered[0].capital[0]}</p>
            <p>Area {filtered[0].area}</p>
            <h2>Languages</h2>
            <ul>
              {Object.values(filtered[0].languages).map((l) => {
                return <li>{l}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
