import React from "react";

const Person = ({ person }) => {
  return (
    <div>
      <h3>
        {person.name} {person.number}
      </h3>
    </div>
  );
};

export default Person;
