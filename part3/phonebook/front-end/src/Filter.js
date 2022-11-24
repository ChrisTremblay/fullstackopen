const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter by name:{' '}
      <input
        name='filter'
        type='text'
        value={filter.query}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;
