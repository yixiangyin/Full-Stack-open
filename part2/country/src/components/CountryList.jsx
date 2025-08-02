import Weather from "./Weather";
const Country = ({ country }) => {
  const capital = country.capital;
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {capital?.[0] ?? "N/A"}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((l) => {
          return <li key={l}>{l}</li>;
        })}
      </ul>
      <img src={country.flags["png"]} alt={country.flags["alt"]} />
      {capital ? <Weather country={country} /> : null}
    </div>
  );
};

const CountryList = ({ countries, showCountry }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (countries.length > 1) {
    return countries.map((c) => (
      <div key={c.cca3}>
        {c.name.common}{" "}
        <button onClick={() => showCountry(c.name.common)}>Show</button>
      </div>
    ));
  }
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
  return <div>No matches, please try another search</div>;
};

export default CountryList;
