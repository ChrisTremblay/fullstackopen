import { useState, useEffect } from 'react';
import Form from './Form';
import Filter from './Filter';
import Persons from './Persons';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState({
    query: '',
    displayList: null,
    completeList: null,
  });
  const [formState, setFormState] = useState({ name: '', phone: '', id: '' });

  const getAndSetAllPersons = async () => {
    const allPersons = await personsService.getAll();
    setPersons({
      query: '',
      displayList: allPersons,
      completeList: allPersons,
    });
  };

  const addPerson = async (e) => {
    e.preventDefault();
    if (checkUniqueName(formState.name)) {
      const newPerson = {
        name: formState.name,
        phone: formState.phone,
        id: `${formState.name}`,
      };
      const created = await personsService.create(newPerson);
      console.log(`${created.name} created with id ${created.id}`);
    } else {
      if (
        window.confirm(
          `${formState.name} is already added to the phonebook, do you want to replace the number?`
        )
      ) {
        const toBeModified = await personsService.getById(formState.name);
        await personsService.update(formState.name, {
          ...toBeModified,
          phone: formState.phone,
        });
      } else {
        alert(`${formState.name} already taken`);
      }
    }
    getAndSetAllPersons();
    setFormState({ name: '', phone: '', id: '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Do you really want to remove this user?')) {
      await personsService.remove(id);
      getAndSetAllPersons();
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFilterChange = async (e) => {
    const results = persons.completeList.filter((person) => {
      if (e.target.value === '') return persons.completeList;
      return person.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setPersons({
      ...persons,
      query: e.target.value,
      displayList: results,
    });
  };

  const checkUniqueName = (name) =>
    !persons.completeList.some((el) => el.name === name);

  useEffect(() => {
    getAndSetAllPersons();
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Filter your phonebook</h2>
      <Filter filter={persons} handleFilterChange={handleFilterChange} />
      <h2>Add new number</h2>
      <Form
        form={formState}
        handleChange={handleChange}
        handleSubmit={addPerson}
      />
      <h2>Numbers</h2>
      {persons.displayList && (
        <Persons persons={persons.displayList} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
