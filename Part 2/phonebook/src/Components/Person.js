import React from "react";

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      <h3>
        {person.name} {person.number}
      </h3>
      <button onClick={deletePerson}>Delete</button>
    </div>
  );
};

export default Person;
