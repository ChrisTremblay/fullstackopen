import { filterChange } from '../reducers/filterReducer';
import { useDispatch, useSelector } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      Filter:
      <input
        type='test'
        name='filter'
        onChange={(e) => dispatch(filterChange(e.target.value))}
      />
    </div>
  );
};

export default Filter;
