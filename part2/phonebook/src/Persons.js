const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.list.map((person) => (
        <li key={person.name}>
          {person.name}: {person.phone}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
