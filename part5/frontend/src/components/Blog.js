import Togglable from './Togglable';
import BlogDetails from './BlogDetails';

const Blog = ({ blog, handleBlogDeletion, handleLikeBlog, loggedUsername }) => {
  const handleClick = (id) => {
    handleBlogDeletion(id);
  };
  return (
    <div
      className='blog'
      style={{
        border: '1px solid black',
        borderRadius: '8px',
        margin: '10px 0',
        padding: '10px',
      }}
    >
      <span className='blog--title'>{blog.title}</span> -{' '}
      <span className='blog--author'>By {blog.author}</span>
      <Togglable createButtonLabel='View details' cancelButtonLabel='Hide'>
        <BlogDetails blog={blog} handleLikeBlog={handleLikeBlog} />
      </Togglable>
      {loggedUsername === blog.user.username && (
        <button
          className='btn blog--btn-delete'
          onClick={() => handleClick(blog.id)}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Blog;
