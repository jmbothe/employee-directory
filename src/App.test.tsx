import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from './App';
import { EmployeeListItem } from './domain/EmployeeListItem';
import { Runtime } from './runtime/Runtime';
import RuntimeContext from './runtime/RuntimeContext';

let employees: EmployeeListItem[];

// This is acceptable for a small test suit, but as the runtime grows and testing grows we'll need an adapter-test module.
const runtime: Runtime = {
  getEmployeeRepository: () => ({
    searchEmployees: jest.fn(() => Promise.resolve(employees))
  })
}

function setupApp() {
  return  (
    <RuntimeContext.Provider value={runtime}>
      <App/>
    </RuntimeContext.Provider>
  )
}

beforeEach(async function() {
  employees = [];
})

test('should render the employee list', async () => {
  render(setupApp());

  const tableHeading = screen.getByText("Search Results");

  expect(tableHeading).toBeInTheDocument();
});

test('should search for employees', async () => {
  // Mocking data in-test is fine for a small test suite, but a test data generator would be useful as testing grows.
  employees = [{id: "1", name: "Joan of Arc"}];

  render(setupApp());

  userEvent.type(
    screen.getByLabelText("Search employees by name"),
    'Arbitrary string cuz we\'re not testing the API'
  );

  const employee = await screen.findByText(/Joan of Arc/i);

  expect(employee).toBeInTheDocument();
});
