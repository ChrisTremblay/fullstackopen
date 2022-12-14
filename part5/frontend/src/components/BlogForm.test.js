import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

test('<BlogForm /> updates parent state (title, author and url) and calls onSubmit', async () => {
  const handleCreateBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm handleCreateBlog={handleCreateBlog} />);

  const inputTitle = screen.getByPlaceholderText('title..');
  const inputUrl = screen.getByPlaceholderText('url..');
  const inputAuthor = screen.getByPlaceholderText('author..');
  const sendButton = screen.getByText('Create');

  await user.type(inputTitle, 'testing title input');
  await user.type(inputUrl, 'testing url input');
  await user.type(inputAuthor, 'testing author input');
  await user.click(sendButton);

  console.log(handleCreateBlog.mock.calls[0][0]);
  expect(handleCreateBlog.mock.calls).toHaveLength(1);
  expect(handleCreateBlog.mock.calls[0][0].title).toBe('testing title input');
  expect(handleCreateBlog.mock.calls[0][0].url).toBe('testing url input');
  expect(handleCreateBlog.mock.calls[0][0].author).toBe('testing author input');
});
