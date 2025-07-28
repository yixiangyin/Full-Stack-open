import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const removePerson = (id) => {
    const personToRemove = persons.find((person) => person.id === id);
    if (confirm(`Delete ${personToRemove.name} ?`)) {
      personService.remove(id).then((removedPerson) => {
        setPersons(persons.filter((person) => person.id !== id));
        console.log("removed", removedPerson);
      });
    }
  };

  const changeNumber = (id, number) => {
    const person = persons.find((p) => p.id === id);
    const changedPerson = { ...person, number: number };
    personService.update(id, changedPerson).then((returnPerson) => {
      setPersons(
        persons.map((person) => (person.id === id ? returnPerson : person))
      );
    });
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        confirm(
          `${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        changeNumber(existingPerson.id, newNumber);
        setNewName("");
        setNewNumber("");
      }
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
