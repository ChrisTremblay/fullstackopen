import { info, error } from './logger.js';

const requestLogger = (request, response, next) => {
  info('Method:', request.method);
  info('Path:  ', request.path);
  info('Body:  ', request.body);
  info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown Endpoint' });
};

const errorHandler = (err, request, response, next) => {
  error(err.message);
  if (err.name === 'CastError') {
    console.log('Cast error');
    return response.status(400).send({ error: 'Malformatted ID' });
  } else if (err.name === 'ValidationError') {
    console.log('Validation error');
    return response.status(400).json({ error: err.message });
  }
  next(err);
};

export { unknownEndpoint, errorHandler, requestLogger };
