import { useState } from 'react';
import utils from '../utils/utils.js';

const LoginForm = ({ handleLogin }) => {
  const emptyUser = { username: '', password: '' };
  const [formLoginState, setFormLoginState] = useState(emptyUser);

  const handleLoginFormChange = (e) => {
    setFormLoginState(utils.handleChangeForm(formLoginState, e));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formLoginState);
    setFormLoginState(emptyUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in to the application</h2>
      <div>
        Username:{' '}
        <input
          id='username'
          value={formLoginState.username}
          type='text'
          name='username'
          onChange={handleLoginFormChange}
        />
      </div>
      <div>
        Password:{' '}
        <input
          id='password'
          value={formLoginState.password}
          type='password'
          name='password'
          onChange={handleLoginFormChange}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
