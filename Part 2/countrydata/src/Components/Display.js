import React from "react";
import Country from "./Country";

const Display = ({ filteredCountries }) => {
  if (filteredCountries.length > 10) {
    return <h2>Too many results, please narrow search.</h2>;
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <ul key={country.name.common}>{country.name.common}</ul>
        ))}
      </div>
    );
  } else if (filteredCountries.length === 0) {
    return <h2>No reuslts found</h2>;
  } else {
    return (
      <div>
        {filteredCountries.map((country) => (
          <Country key={country.name.common} country={country} />
        ))}
      </div>
    );
  }
};

export default Display;
