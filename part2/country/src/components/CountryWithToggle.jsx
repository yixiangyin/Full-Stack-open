import { useState } from "react";
import Country from "./Country";

const CountryWithToggle = ({ country }) => {
  const [show, setShow] = useState(false);
  const onToggle = (event) => {
    setShow(!show);
  };
  return (
    <div>
      <p>
        {country.name.common} <button onClick={onToggle}>Show</button>
      </p>
      {show ? <Country country={country} /> : null}
    </div>
  );
};

export default CountryWithToggle;
