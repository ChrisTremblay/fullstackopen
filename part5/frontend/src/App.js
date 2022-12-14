import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './Notification';
import Togglable from './components/Togglable';
import login from './services/login';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const emptyNotif = { message: '', type: '' };
  const [notification, setNotification] = useState(emptyNotif);

  const getBlogsFromDB = async () => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1));
    setBlogs(blogs);
  };

  const displayAlert = (message, type, timeout) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(emptyNotif);
    }, timeout);
  };

  const handleLogin = async (newUser) => {
    try {
      const user = await login(newUser);
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      displayAlert('Logged in successfully', 'success', 3000);
    } catch (exception) {
      displayAlert('Wrong credentials', 'danger', 3000);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    window.localStorage.removeItem('loggedUser');
    displayAlert('Logged out successfully', 'success', 3000);
  };

  const handleCreateBlog = async (newBlog) => {
    try {
      await blogService.create(newBlog);
      displayAlert('Blog created', 'success', 3000);
      getBlogsFromDB();
    } catch (e) {
      displayAlert(e.response.data.error, 'danger', 3000);
    }
  };

  const handleLikeBlog = async (id, newBlog) => {
    try {
      await blogService.update(id, newBlog);
      getBlogsFromDB();
    } catch (e) {
      displayAlert(e.response.data.error, 'danger', 3000);
    }
  };

  const handleBlogDeletion = async (id) => {
    try {
      await blogService.remove(id);
      displayAlert('Blog post successfully deleted', 'success', 3000);
      getBlogsFromDB();
    } catch (e) {
      displayAlert(e.response.data.error, 'danger', 3000);
    }
  };

  useEffect(() => {
    getBlogsFromDB();
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <h1>Blogs app</h1>
      {user ? (
        <>
          <h2>Blogs</h2>
          <div style={{ marginBottom: '20px' }}>
            You are logged in as <em>{user.username}</em>
            <br />
            <button onClick={handleLogout}>Logout</button>
          </div>
          <Togglable createButtonLabel='New Blog' cancelButtonLabel='Cancel'>
            <BlogForm handleCreateBlog={handleCreateBlog} />
          </Togglable>
          <br />
          <div className='list-of-blogs'>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleBlogDeletion={handleBlogDeletion}
                handleLikeBlog={handleLikeBlog}
                loggedUsername={user.username}
              />
            ))}
          </div>
        </>
      ) : (
        <div>
          <LoginForm handleLogin={handleLogin} />
        </div>
      )}
      <p>
        <em>Blog app, constructed for the fullstackopen course about React</em>
      </p>
    </div>
  );
};

export default App;
