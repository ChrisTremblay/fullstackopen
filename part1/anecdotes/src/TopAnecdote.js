const TopAnecdote = ({ anecdote }) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote}</p>
    </div>
  );
};

export default TopAnecdote;
