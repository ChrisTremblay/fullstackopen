import React from 'react';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleClick(anecdote.id)}>Vote!</button>
      </div>
    </div>
  );
};

export default Anecdote;
