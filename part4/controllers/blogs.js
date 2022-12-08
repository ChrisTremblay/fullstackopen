import express from 'express';
const blogsRouter = express.Router();
import Blog from '../models/blog.js';
import User from '../models/user.js';
import { tokenExtractor, userExtractor } from '../utils/middleware.js';

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  return response.json(allBlogs);
});

blogsRouter.post(
  '/',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const body = request.body;
    if (!request.user.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(request.user.id);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });
    const saved = await blog.save();
    user.blogs = user.blogs.concat(saved._id);
    await user.save();
    response.status(201).json(saved);
  }
);

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

blogsRouter.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (!request.user || request.user.id.toString() !== blog.user.toString()) {
      return response.status(401).json({
        error: "You don't have permission for deleting this ressource",
      });
    }
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
);

export default blogsRouter;
