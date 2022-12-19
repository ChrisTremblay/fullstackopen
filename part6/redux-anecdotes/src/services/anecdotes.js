import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (content) => {
  const newObject = {
    content,
    id: getId(),
    votes: 0,
  };
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const increaseVote = async (id) => {
  const allAnecdotes = await getAll();
  const anecdote = allAnecdotes.find((anecdote) => anecdote.id === id);
  const votedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };

  await axios.put(`${baseUrl}/${id}`, votedAnecdote);
  const newAnecdotesArr = await getAll();
  return newAnecdotesArr;
};

export default { getAll, createAnecdote, increaseVote };
