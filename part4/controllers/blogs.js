import express from 'express';
const blogsRouter = express.Router();
import Blog from '../models/blog.js';

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({});
  return response.json(allBlogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);
  const saved = await blog.save();
  response.status(201).json(saved);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) response.status(200).json(blog);
  else response.status(404).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: request.body.likes },
    { new: true, context: 'query' }
  );
  if (updatedBlog) response.status(200).json(updatedBlog);
  else response.status(204).end();
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

export default blogsRouter;
