import { useState } from 'react';
import Form from './Form';
import Filter from './Filter';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 },
  ]);
  const [formState, setFormState] = useState({ name: '', phone: '', id: '' });
  const [filter, setFilter] = useState({ query: '', list: persons });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    const results = persons.filter((person) => {
      if (e.target.value === '') return persons;
      return person.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilter({
      query: e.target.value,
      list: results,
    });
  };

  const addPerson = (e) => {
    e.preventDefault();
    if (checkUniqueName(formState.name)) {
      const newPerson = {
        name: formState.name,
        phone: formState.phone,
      };
      setPersons(persons.concat(newPerson));
      setFilter({ query: '', list: persons.concat(newPerson) });
    } else {
      alert(`${formState.name} already taken`);
    }
    setFormState({ name: '', phone: '', id: '' });
  };

  const checkUniqueName = (name) => !persons.some((el) => el.name === name);

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Filter your phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new number</h2>
      <Form
        form={formState}
        handleChange={handleChange}
        handleSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={filter} />
    </div>
  );
};

export default App;
