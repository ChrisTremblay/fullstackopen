import { info, error } from './logger.js';
import jwt from 'jsonwebtoken';

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

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  request.token =
    authorization &&
    authorization.toLowerCase().startsWith('bearer ') &&
    authorization.length > 7
      ? authorization.substring(7)
      : null;
  if (request.token === null)
    response.status(401).send({ error: 'No token provided' });
  next();
};

const userExtractor = (request, response, next) => {
  request.user =
    request.token !== null
      ? jwt.verify(request.token, process.env.SECRET)
      : null;
  if (request.user === null)
    response.status(401).send({ error: 'No token provided' });
  next();
};

const errorHandler = (err, request, response, next) => {
  error('Error: ', err.message);
  if (err.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID' });
  } else if (err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message });
  } else if (err.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token' });
  } else if ((error.name = 'TokenExpiredError')) {
    return response.status(401).json({ error: 'Token expired' });
  }
  next(err);
};

export {
  unknownEndpoint,
  errorHandler,
  requestLogger,
  tokenExtractor,
  userExtractor,
};
