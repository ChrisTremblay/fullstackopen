import { useState } from 'react';
import utils from '../utils/utils.js';

const BlogForm = ({ handleCreateBlog }) => {
  const emptyBlog = { title: '', author: '', url: '' };
  const [formBlogState, setFormBlogState] = useState(emptyBlog);

  const handleBlogFormChange = (e) => {
    setFormBlogState(utils.handleChangeForm(formBlogState, e));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateBlog(formBlogState);
    setFormBlogState(emptyBlog);
  };

  return (
    <form onSubmit={handleSubmit} className='blog--add'>
      <h2>Add a new Blog</h2>
      <div>
        Title:{' '}
        <input
          value={formBlogState.title}
          type='text'
          name='title'
          placeholder='title..'
          onChange={handleBlogFormChange}
        />
      </div>
      <div>
        Author:{' '}
        <input
          value={formBlogState.author}
          type='text'
          name='author'
          placeholder='author..'
          onChange={handleBlogFormChange}
        />
      </div>
      <div>
        URL:{' '}
        <input
          value={formBlogState.url}
          type='url'
          name='url'
          placeholder='url..'
          onChange={handleBlogFormChange}
        />
      </div>
      <button type='submit'>Create</button>
    </form>
  );
};

export default BlogForm;
