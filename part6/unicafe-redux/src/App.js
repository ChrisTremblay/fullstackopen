import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  return (
    <div>
      <button onClick={(e) => dispatch({ type: 'GOOD' })}>Good 😄</button>
      <button onClick={(e) => dispatch({ type: 'OK' })}>Ok 👍</button>
      <button onClick={(e) => dispatch({ type: 'BAD' })}>Bad.. 😢</button>
      <button onClick={(e) => dispatch({ type: 'ZERO' })}>
        Reset stats 🙌
      </button>
      <div>Good {counter.good} 😄 </div>
      <div>Ok {counter.ok} 👌 </div>
      <div>Bad {counter.bad} 👎 </div>
    </div>
  );
};

export default App;
