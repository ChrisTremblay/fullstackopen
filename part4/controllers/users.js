import bcrypt from 'bcrypt';
import express from 'express';
const usersRouter = express.Router();
import User from '../models/user.js';

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    });
  }
  if (password.match(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/)) {
    console.log(password);
    return response.status(400).json({
      error:
        'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  response.json(users);
});

export default usersRouter;
