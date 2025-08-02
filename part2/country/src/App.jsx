import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import CountryList from "./components/CountryList";

const COUNTRY_API_URL = 'https://studies.cs.helsinki.fi/restcountries/'

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${COUNTRY_API_URL}/api/all`)
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      });
  }, []);

  const matchedCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLocaleLowerCase())
  );

  const onChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <div>
      find countries <input value={search} onChange={onChange}></input>
      {loading ? (
        <p>Loading countries...</p>
      ) : search === "" ? null : (
        <CountryList countries={matchedCountries} showCountry={setSearch}/>
      )}
    </div>
  );
};

export default App;
