import React, { useState, useEffect } from "react";
import axios from "axios";
import Display from "./Components/Display";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setAllCountries(response.data);
    });
  }, []);

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  const filteredCountries = allCountries.filter(({ name }) =>
    name.common.toLowerCase().includes(newFilter)
  );

  return (
    <div>
      Find Countries: <input value={newFilter} onChange={handleFilterChange} />
      <Display
        filteredCountries={filteredCountries}
        setNewFilter={setNewFilter}
      />
    </div>
  );
}

export default App;
