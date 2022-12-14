import mongoose from 'mongoose';
import supertest from 'supertest';
const api = supertest(app);
import app from '../app';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { usersInDb } from './test_helper';

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('!@1Abc12313qsdqdQDQWDQWDde', 10);
  const user = new User({ username: 'root', name: 'Root', passwordHash });
  await user.save();
});

describe('when there is initially users in db', () => {
  test('are returned as json', async () => {
    const initialUsers = await usersInDb();
    const newUser = {
      username: 'test3',
      name: 'Test3',
      password: '!@1Abc12313qsdqdQDQWDQWDde',
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const usersAtTheEnd = await usersInDb();
    expect(usersAtTheEnd).toHaveLength(initialUsers.length + 1);
    const usernames = usersAtTheEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test('username must be unique and error message clear', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'root',
      name: 'Root1',
      password: '!@1Abc12313qsdqdQDQWDQWDde',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must be unique');

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
  test('password must have minimum 8 chars, 1 number, 1 uppercase, 1 lowercase, 1 special character', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'password',
      name: 'Password',
      password: '123qwdDVqe',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    );

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
