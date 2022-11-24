import { useState, useEffect } from 'react';
import Form from './Form';
import Filter from './Filter';
import Persons from './Persons';
import Notification from './Notification';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState({
    query: '',
    displayList: null,
    completeList: null,
  });
  const [formState, setFormState] = useState({ name: '', phone: '' });
  const [notification, setNotification] = useState({ message: '', status: '' });

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
      };
      try {
        const created = await personsService.create(newPerson);
        setNotification({
          message: `${created.name} created with id ${created.id}`,
          status: 'success',
        });
      } catch (err) {
        setNotification({
          message: err.response.data.error,
          status: 'error',
        });
      }
    } else {
      if (
        window.confirm(
          `${formState.name} is already added to the phonebook, do you want to replace the number?`
        )
      ) {
        let personToModify = persons.completeList.find(
          (person) => person.name.toLowerCase() === formState.name.toLowerCase()
        );
        try {
          await personsService.update(personToModify.id, {
            ...personToModify,
            phone: formState.phone,
          });
          setNotification({
            message: `${personToModify.name} modified with the phone number: ${formState.phone}`,
            status: 'success',
          });
        } catch (err) {
          setNotification({
            message: err.response.data.error,
            status: 'error',
          });
        }
      } else {
        setNotification({
          message: `${formState.name} already taken`,
          status: 'error',
        });
      }
    }
    setTimeout(() => {
      setNotification({ message: '', status: '' });
    }, 3000);
    getAndSetAllPersons();
    setFormState({ name: '', phone: '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Do you really want to remove this user?')) {
      await personsService.remove(id);
      setNotification({
        message: `User with id ${id} deleted`,
        status: 'success',
      });
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
    !persons.completeList.some(
      (el) => el.name.toLowerCase() === name.toLowerCase()
    );

  useEffect(() => {
    getAndSetAllPersons();
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      {notification.message && (
        <Notification
          message={notification.message}
          status={notification.status}
        />
      )}
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
