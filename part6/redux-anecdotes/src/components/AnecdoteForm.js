import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    props.createAnecdote(content);
    // dispatch(createAnecdote(content));
  };
  return (
    <>
      <h2>Create a new Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button>Create!</button>
      </form>
    </>
  );
};

export default connect(null, { createAnecdote })(AnecdoteForm);
// export default AnecdoteForm;
