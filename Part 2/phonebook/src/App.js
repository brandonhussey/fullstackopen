import React, { useState, useEffect } from "react";
import Form from "./Components/Form";
import Phonebook from "./Components/Phonebook";
import Filter from "./Components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        alert("Could not load content");
      });
  });

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} already exists`);
    } else {
      personService
        .addPerson(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          alert("could not add person");
        });
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
    console.log(newFilter);
  };

  const filterNames = persons.filter(({ name }) =>
    name.toLowerCase().includes(newFilter.toLowerCase())
  );

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      console.log(`DELETE ${id}`);
      personService.deletePerson(id).then(() => {
        setPersons(persons.splice(id));
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add New Entry</h3>
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Phonebook filterNames={filterNames} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
