import { useState } from "react";
import Country from "./Country";

const CountryWithToggle = ({ country, api_key }) => {
  const [show, setShow] = useState(false);
  const onToggle = (event) => {
    setShow(!show);
  };
  return (
    <div>
      <p>
        {country.name.common} <button onClick={onToggle}>Show</button>
      </p>
      {show ? <Country api_key={api_key} country={country} /> : null}
    </div>
  );
};

export default CountryWithToggle;
