import { useState } from 'react';
import Button from './Button';
import TopAnecdote from './TopAnecdote';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const generateRandom = () => Math.floor(Math.random() * anecdotes.length);

  const handleClickRandom = () => {
    setSelected(generateRandom());
  };

  const handleClickVote = (selected) => {
    const newVoteArray = [...votes];
    newVoteArray[selected] += 1;
    setVotes(newVoteArray);
  };

  const getTopAnecdote = () => anecdotes[votes.indexOf(Math.max(...votes))];

  const votesEmpty = () => {
    return votes.every((e) => {
      return e == 0;
    });
  };

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>{votes[selected]} voted for this anecdote!</p>
      <Button name='Random anecdote' handleClick={handleClickRandom} />
      <Button name='Vote' handleClick={() => handleClickVote(selected)} />
      <TopAnecdote
        anecdote={votesEmpty() ? 'No votes in yet' : getTopAnecdote()}
      />
    </div>
  );
};

export default App;
