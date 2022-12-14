import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from './Togglable';

describe('<Togglable />', () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable createButtonLabel='View details' cancelButtonLabel='Hide'>
        <div className='testDiv'>togglable content</div>
      </Togglable>
    ).container;
  });

  test('renders the children on load', async () => {
    await screen.findAllByText('togglable content');
  });

  test('children are not displayed on render', () => {
    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking button "View details", children are rendered', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('View details');
    await user.click(button);

    const div = container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('displayed children are hidden after clicking button "Hide', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('View details');
    await user.click(button);

    const closeButton = screen.getByText('Hide');
    await user.click(closeButton);

    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});
