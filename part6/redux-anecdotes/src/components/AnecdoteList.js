import React from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { increaseVote } from '../reducers/anecdoteReducer';
import {
  displayNotification,
  resetNotification,
} from '../reducers/notificationReducer';
import Anecdote from './Anecdote';

const AnecdoteList = (props) => {
  // const dispatch = useDispatch();
  // const anecdotes = useSelector((state) => {
  //   const anectodes =
  //     state.filter === ''
  //       ? state.anecdotes
  //       : state.anecdotes.filter((anecdote) =>
  //           anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
  //         );
  //   return [...anectodes].sort((a, b) => b.votes - a.votes);
  // });

  // const handleVote = (anecdote) => {
  //   props.dispatch(increaseVote(anecdote.id));
  //   props.dispatch(
  //     displayNotification(`You voted for '${anecdote.content}'`, 3000)
  //   );
  // };

  const handleVote = (anecdote) => {
    props.increaseVote(anecdote.id);
    props.displayNotification(
      `You voted for '${anecdote.content}'`,
      3000,
      props.notification.id
    );
  };

  return (
    <div>
      {props.anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      ))}
    </div>
  );
};
const mapStateToProps = (state) => {
  const anectodes =
    state.filter === ''
      ? state.anecdotes
      : state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        );
  return {
    anecdotes: [...anectodes].sort((a, b) => b.votes - a.votes),
    filter: state.filter,
    notification: state.notification,
  };
};
const mapDispatchToProps = {
  increaseVote,
  displayNotification,
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdoteList;
