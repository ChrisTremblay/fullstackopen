import { filterChange } from '../reducers/filterReducer';
import { useDispatch, useSelector, connect } from 'react-redux';

const Filter = (props) => {
  // const dispatch = useDispatch();

  return (
    <div>
      Filter:
      <input
        type='test'
        name='filter'
        onChange={(e) => props.filterChange(e.target.value)}
        // onChange={(e) => dispatch(filterChange(e.target.value))}
      />
    </div>
  );
};

export default connect(null, { filterChange })(Filter);
// export default Filter;
