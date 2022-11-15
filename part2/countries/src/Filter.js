const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      <h2>Search for your desired country!</h2>
      <label>Country: </label>{' '}
      <input
        name='filter'
        type='text'
        value={filter.query}
        onChange={onFilterChange}
      ></input>
    </div>
  );
};

export default Filter;
