import Person from "./Person";

const Persons = (props) => {
  return props.personsToShow.map((person) => {
    return <Person key={person.id} person={person} deletePerson={() => props.removePerson(person.id)}/>;
  });
};

export default Persons;
