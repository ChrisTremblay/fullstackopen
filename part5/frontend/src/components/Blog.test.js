import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

let container;
const blog = {
  title: 'Testing Blog',
  author: 'Tester',
  url: 'https://google.ch',
  likes: 40,
  user: {
    username: 'username',
  },
};

describe('<Blog />', () => {
  beforeEach(() => {
    container = render(<Blog blog={blog} />).container;
  });
  test('Renders title on load', () => {
    const element = container.querySelector('.blog--title');
    expect(element).toHaveTextContent('Testing Blog');
  });
  test('Renders author on load', () => {
    const element = container.querySelector('.blog--author');
    expect(element).toHaveTextContent('Tester');
  });
  test('Do not display blog details', () => {
    const element = container.querySelector('.blog--details');
    expect(element.parentElement).toHaveStyle('display: none');
  });
  test('Do not display blog url', () => {
    const element = container.querySelector('.blog--url');
    expect(element.parentElement.parentElement).toHaveStyle('display: none');
  });
  test('Do not display blog likes', () => {
    const element = container.querySelector('.blog--likes');
    expect(element.parentElement.parentElement).toHaveStyle('display: none');
  });
  test('Do not display blog user', () => {
    const element = container.querySelector('.blog--user');
    expect(element.parentElement.parentElement).toHaveStyle('display: none');
  });
});
describe('User interaction', () => {
  test('Clicking the button "Like" calls the event handler once', async () => {
    const mockHandler = jest.fn();
    render(<Blog blog={blog} handleLikeBlog={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText('Like');
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });
  test('Clicking it twice calls the event handler twice', async () => {
    const mockHandler = jest.fn();
    render(<Blog blog={blog} handleLikeBlog={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText('Like');
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
