import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import Blog from '../models/blog';
import { nonExistingId, initialBlogs, blogsInDb } from './test_helper';

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

describe('Existing blogs in DB', () => {
  test('are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('are all returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('contains a specific blog titled "Test blog 2"', async () => {
    const response = await api.get('/api/blogs');
    const titles = response.body.map((r) => r.title);
    expect(titles).toContain('Test blog 2');
  });
  test('contains has a specific id parameter', async () => {
    const allBlogs = await blogsInDb();
    const blogToBeCheckedForId = allBlogs[0];
    expect(blogToBeCheckedForId.id).toBeDefined();
  });
});

describe('Viewing a specific note', () => {
  test('succeeds when provided with a valid id', async () => {
    const allBlogs = await blogsInDb();
    const blogToView = allBlogs[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));
    expect(resultBlog.body).toEqual(processedBlogToView);
  });

  test('fails with statuscode 404 if blogs does not exist', async () => {
    const validNonexistingId = await nonExistingId();
    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });
  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';
    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe('Addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'From the valid blog can be added test',
      author: 'Added',
      url: 'https://google.ch',
      likes: 10,
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const response = await blogsInDb();
    expect(response).toHaveLength(initialBlogs.length + 1);

    const contents = response.map((r) => r.title);
    expect(contents).toContain('From the valid blog can be added test');
  });
  test('with no likes provided has the likes value set to 0', async () => {
    const newBlog = {
      title: 'Test with likes set to 0',
      author: 'No likes set',
      url: 'https://google.ch',
    };
    await api.post('/api/blogs').send(newBlog).expect(201);
    const allBlogs = await blogsInDb();
    const blogToBeCheckedForLikes = allBlogs[allBlogs.length - 1];
    expect(blogToBeCheckedForLikes.likes).toBe(0);
  });
  test('fails with status 400 if blog without title is provided', async () => {
    const newBlog = {
      author: 'No title',
      url: 'https://google.ch',
      likes: 1,
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
    const response = await blogsInDb();
    expect(response).toHaveLength(initialBlogs.length);
  });
  test('fails with status 400 if blog without url is provided', async () => {
    const newBlog = {
      title: 'Test with no url',
      author: 'No url',
      likes: 1,
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
    const response = await blogsInDb();
    expect(response).toHaveLength(initialBlogs.length);
  });
});

describe('Deletion of a blog', () => {
  test('succeed with status code 204 if id is valid', async () => {
    const allBlogs = await blogsInDb();
    const blogToDelete = allBlogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const allBlogsAfter = await blogsInDb();

    expect(allBlogsAfter).toHaveLength(initialBlogs.length - 1);

    const contents = allBlogsAfter.map((r) => r.title);
    expect(contents).not.toContain(blogToDelete.title);
  });
});

describe('Modification of a blog', () => {
  test('succeeds with status code 200 when updating likes parameter', async () => {
    const newBlog = {
      title: 'Test to be updated',
      author: 'TBU',
      url: 'https://google.ch',
      likes: 10,
    };
    await api.post('/api/blogs').send(newBlog).expect(201);
    const allBlogs = await blogsInDb();
    const blogToBeModified = allBlogs[allBlogs.length - 1];

    const updatedBlog = {
      ...newBlog,
      likes: 100,
    };
    const response = await api
      .put(`/api/blogs/${blogToBeModified.id}`)
      .send(updatedBlog)
      .expect(200);
    expect(response.body.likes).toBe(100);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
