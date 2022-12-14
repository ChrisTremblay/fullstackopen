import express from 'express';
import 'express-async-errors';
const app = express();
import cors from 'cors';
import mongoose from 'mongoose';
import blogsRouter from './controllers/blogs.js';
import usersRouter from './controllers/users.js';
import loginRouter from './controllers/login.js';
import testingRouter from './controllers/testing.js';
import {
  unknownEndpoint,
  errorHandler,
  requestLogger,
} from './utils/middleware.js';
import { info } from './utils/logger.js';
import { MONGO_URL } from './utils/config.js';

info('connecting to', MONGO_URL);
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
};
connectDB();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
