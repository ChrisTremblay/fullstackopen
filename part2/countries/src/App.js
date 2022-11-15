import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import Countries from './Countries';
import axios from 'axios';

const App = () => {
  const [filter, setFilter] = useState({ query: '', list: '' });
  const [listOfCountries, setListOfCountries] = useState(null);
  const handleFilterChange = (e) => {
    const results = listOfCountries.filter((country) => {
      if (e.target.value === '') return country;
      return country.name.common
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setFilter({
      query: e.target.value,
      list: results,
    });
  };
  useEffect(() => {
    if (!listOfCountries) {
      const getListOfCountries = async () => {
        const res = await axios.get('https://restcountries.com/v3.1/all');
        setListOfCountries(res.data);
      };
      getListOfCountries();
    }
  }, []);
  return (
    <div>
      <Filter filter={filter.query} onFilterChange={handleFilterChange} />
      {filter.list && <Countries countries={filter.list} />}
    </div>
  );
};

export default App;
