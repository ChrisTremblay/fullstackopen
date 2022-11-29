import Blog from '../models/blog';

const initialBlogs = [
  {
    title: 'Test blog 1',
    author: 'Chris1',
    url: 'https://google.ch',
    likes: 10,
  },
  {
    title: 'Test blog 2',
    author: 'Chris2',
    url: 'https://google.ch',
    likes: 5,
  },
];

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

export { nonExistingId, initialBlogs, blogsInDb };
