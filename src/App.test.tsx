import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('should render the employee list', async () => {
  render(<App />);

  const tableHeading = screen.getByText("Search Results");

  expect(tableHeading).toBeInTheDocument();
});

test('should search for employees', async () => {
  render(<App />);

  userEvent.type(
    screen.getByLabelText("Search employees by name"),
    'Arbitrary'
  );

  const employee = await screen.findByText(/Rick Sanchez/i);

  expect(employee).toBeInTheDocument();
});

