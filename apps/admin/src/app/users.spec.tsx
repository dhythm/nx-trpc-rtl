import '@testing-library/jest-dom';
import { render } from '@test';
import { screen } from '@testing-library/react';
import { Users } from './users';

test('Can display user list', async () => {
  render(<Users />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(await screen.findByText('Alice')).toBeInTheDocument();
});
