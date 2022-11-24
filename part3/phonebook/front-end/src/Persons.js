import Person from './Person';

const Persons = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.id} person={person} handleDelete={handleDelete} />
        // <li key={person.name}>
        //   {person.name}: {person.phone}{' '}
        //   <button onClick={() => handleDelete(person.id)}>Delete</button>
        // </li>
      ))}
    </ul>
  );
};

export default Persons;
