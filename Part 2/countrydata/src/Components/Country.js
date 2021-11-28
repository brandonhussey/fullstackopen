import React from "react";
import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <h4>Capital: {country.capital}</h4>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([key, val]) => (
          <li key={key}>{val}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" />
      <Weather capital={country.capital} />
    </div>
  );
};

export default Country;
