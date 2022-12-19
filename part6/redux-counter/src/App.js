import React from 'react';
import { createStore } from 'redux';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;
    default: // if none of the above matches, code comes here
      return state;
  }
};
const store = createStore(counterReducer);

store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
});

const App = () => {
  return (
    <div>
      <div>{store.getState()}</div>
      <button onClick={(e) => store.dispatch({ type: 'INCREMENT' })}>
        Add
      </button>
      <button onClick={(e) => store.dispatch({ type: 'DECREMENT' })}>
        Remove
      </button>
      <button onClick={(e) => store.dispatch({ type: 'ZERO' })}>Reset</button>
    </div>
  );
};
export default App;
