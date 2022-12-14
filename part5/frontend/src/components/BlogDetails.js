import blogService from '../services/blogs';

const BlogDetails = ({ blog, handleLikeBlog }) => {
  const handleLike = async (e) => {
    e.preventDefault();
    console.log(blog);
    const newBlog = {
      author: blog.author,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user.id,
    };
    handleLikeBlog(blog.id, newBlog);
  };
  return (
    <div className='blog--details'>
      <span className='blog--url'>Url: {blog.url}</span>
      <br />
      <span className='blog--likes'>Likes: {blog.likes}</span>
      <button onClick={handleLike}>Like</button>
      <br />
      <span className='blog--user'>User: {blog.user.name}</span>
    </div>
  );
};

export default BlogDetails;
