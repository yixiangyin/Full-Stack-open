import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Country = ({ country, api_key }) => {
  const capital = country.capital;
  const capitalInfo = country.capitalInfo?.latlng;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${capitalInfo[0]}&lon=${capitalInfo[1]}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [capitalInfo, api_key]);
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
      {capital && weather && (
        <div>
          <h2>Weather in {capital}</h2>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Country;
