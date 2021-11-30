import React from "react";
import Person from "./Person";

const Phonebook = ({ filterNames, deletePerson }) => {
  return (
    <div>
      <ul>
        {filterNames.map((person) => (
          <Person
            key={person.name}
            person={person}
            deletePerson={() => deletePerson(person.id, person.name)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Phonebook;
