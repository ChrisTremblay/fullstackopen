import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseVote } from '../reducers/anecdoteReducer';
import {
  displayNotification,
  resetNotification,
} from '../reducers/notificationReducer';
import Anecdote from './Anecdote';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const anecdotes = useSelector((state) => {
    const anectodes =
      state.filter === ''
        ? state.anecdotes
        : state.anecdotes.filter((anecdote) =>
            anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
          );
    return [...anectodes].sort((a, b) => b.votes - a.votes);
  });

  const handleVote = (anecdote) => {
    dispatch(increaseVote(anecdote.id));
    dispatch(displayNotification(`You voted for '${anecdote.content}'`, 3000));
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
