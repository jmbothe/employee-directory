import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('should render the employee list', async () => {
  render(<App />);

  const tableHeading = screen.getByText("Search Results");

  expect(tableHeading).toBeInTheDocument();
});
