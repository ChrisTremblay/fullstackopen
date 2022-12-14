import Blog from '../models/blog';
import User from '../models/user';

const createBlogsArray = (userId, numberOfBlogsInit) => {
  const initBlog = [];
  for (let i = 0; i < numberOfBlogsInit; i++) {
    initBlog.push({
      title: `Test blog ${i + 1}`,
      author: `Chris-${i + 1}`,
      url: `https:/google.ch`,
      likes: (i + 1) * 10,
      user: userId,
    });
  }
  return initBlog;
};
const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'www.google.ch' });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

export { nonExistingId, blogsInDb, usersInDb, createBlogsArray };
