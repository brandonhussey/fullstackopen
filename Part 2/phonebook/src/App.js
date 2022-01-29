import React, { useState, useEffect } from "react";
import Form from "./Components/Form";
import Phonebook from "./Components/Phonebook";
import Filter from "./Components/Filter";
import personService from "./services/persons";
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        createMessage(`Could not load content!`, "error");
      });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ) &&
      persons.some((person) => person.number === newNumber)
    ) {
      createMessage(`${newName} already exists!`, "error");
      setNewName("");
      setNewNumber("");
    } else if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ) &&
      persons.some((person) => person.number !== newNumber)
    ) {
      updatePerson(newName, newNumber);
    } else {
      personService
        .addPerson(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          createMessage(`${newName} has been added!`, "success");
        })
        .catch((error) => {
          console.log(error.response.data);
          createMessage(error.response.data.error, "error");
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

  const createMessage = (message, type) => {
    setMessage({
      messageText: message,
      type: type,
    });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const filterNames = persons.filter(({ name }) =>
    name.toLowerCase().includes(newFilter.toLowerCase())
  );

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      console.log(`DELETE ${id}`);
      personService.deletePerson(id).then(() => {
        personService
          .getAll()
          .then((initialPersons) => setPersons(initialPersons))
          .catch((error) => {
            createMessage(error.response.data.error, "error");
          });
      });
      createMessage(`${name} has been deleted!`, "success");
    } else {
      return;
    }
  };

  const updatePerson = (name, updatedNumber) => {
    if (
      window.confirm(
        `${name} already exists, would you like to update the number?`
      )
    ) {
      const selectedPerson = persons.find(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );
      const updatedPerson = { ...selectedPerson, number: updatedNumber };

      personService
        .updatePerson(selectedPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== selectedPerson.id ? person : returnedPerson
            )
          );
          setNewName("");
          setNewNumber("");
          createMessage(`${selectedPerson.name} has been updated!`, "success");
        })
        .catch((error) => {
          createMessage(error.response.data.error, "error");
        });
    } else {
      return;
    }
  };

  return (
    <div>
      <Notification message={message} />
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
