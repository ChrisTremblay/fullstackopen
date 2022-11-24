// EXPRESS //
import express from 'express';
const app = express();
app.use(express.json());
app.use(express.static('build'));

// CORS //
import cors from 'cors';
app.use(cors());

// MORGAN LOGGER //
import morgan from 'morgan';
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// DB IMPORT //
import Phonebook from './models/phonebook.js';

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p><em>Request made on ${new Date()}</em>`
  );
});

app.get('/api/persons', async (request, response) => {
  const allEntries = await Phonebook.find({});
  return response.json(allEntries);
});

app.post('/api/persons', async (request, response) => {
  const body = request.body;
  if (!body.name || !body.phone) {
    return response.status(400).json({
      error: 'Content Missing',
    });
  }

  const phonebook = new Phonebook({
    name: body.name,
    phone: body.phone,
    id: Math.floor(Math.random() * 1000000),
  });
  const createdEntry = await phonebook.save();
  response.json(createdEntry);
});

app.get('/api/persons/:id', async (request, response, next) => {
  try {
    const entry = await Phonebook.findById(request.params.id);
    response.json(entry);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.delete('/api/persons/:id', async (request, response) => {
  const id = Number(request.params.id);
  await Phonebook.findByIdAndRemove(request.params.id);
  console.log(`Person with id: ${id} deleted`);
  response.status(204).end();
});

app.put('/api/persons/:id', async (request, response) => {
  await Phonebook.findByIdAndUpdate(request.params.id, {
    phone: request.body.phone,
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Wrong id' });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
