import React from "react";
import Person from "./Person";

const Phonebook = ({ filterNames }) => {
  return (
    <div>
      <ul>
        {filterNames.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default Phonebook;
