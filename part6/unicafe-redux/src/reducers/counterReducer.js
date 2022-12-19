const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  let changedCounter = {};
  switch (action.type) {
    case 'GOOD':
      changedCounter = { ...state, good: state.good + 1 };
      return changedCounter;
    case 'OK':
      changedCounter = { ...state, ok: state.ok + 1 };
      return changedCounter;
    case 'BAD':
      changedCounter = { ...state, bad: state.bad + 1 };
      return changedCounter;
    case 'ZERO':
      return initialState;
    default:
      return state;
  }
};

export default counterReducer;
