const Person = ({ person, handleDelete }) => {
  return (
    <li>
      {person.name}: {person.phone}{' '}
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </li>
  );
};

export default Person;
