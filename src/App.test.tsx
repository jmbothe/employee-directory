import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { EmployeeListItem } from "./domain/EmployeeListItem";
import { Runtime } from "./runtime/Runtime";
import RuntimeContext from "./runtime/RuntimeContext";

// react-router-dom doesn't export LocationDescriptor interface.
let initialEntries: any;
let employees: EmployeeListItem[];

// This is acceptable for a small test suit, but as the runtime grows and testing grows we'll need an adapter-test module.
const runtime: Runtime = {
  getEmployeeRepository: () => ({
    searchEmployees: jest.fn(() => Promise.resolve(employees)),
  }),
};

function renderApp() {
  return (
    <RuntimeContext.Provider value={runtime}>
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    </RuntimeContext.Provider>
  );
}

// setup default mock data before each test.
beforeEach(async function () {
  initialEntries = undefined;
  employees = [];
});

test("should render the employee directory page", async () => {
  render(renderApp());

  const mainHeading = screen.getByText("Employee Directory");
  const listHeading = screen.getByText("Search Results");

  expect(mainHeading).toBeInTheDocument();
  expect(listHeading).toBeInTheDocument();
});

test("should render loading indicator and search for employees", async () => {
  // Mocking data in-test is fine for a small test suite, but a test data generator would be useful as testing grows.
  employees = [{ id: "1", name: "Joan of Arc" }];

  render(renderApp());

  userEvent.type(
    screen.getByLabelText("Search employees by name"),
    "Arbitrary string cuz we're not testing the API"
  );

  const loadingIndicator = await screen.findByText("loading...");

  expect(loadingIndicator).toBeInTheDocument();

  const employee = await screen.findByText("Joan of Arc");

  expect(employee).toBeInTheDocument();
});

test("should render empty results message", async () => {
  render(renderApp());

  userEvent.type(
    screen.getByLabelText("Search employees by name"),
    "Arbitrary string cuz we're not testing the API"
  );

  const emptyResultsMessage = await screen.findByText(
    "Sorry, no results. Try expanding your search criteria."
  );

  expect(emptyResultsMessage).toBeInTheDocument();
});

test('should fetch employees on first load when url has "name" query param', async () => {
  initialEntries = ["/employees?name=arbitrary"];
  employees = [{ id: "1", name: "Joan of Arc" }];

  render(renderApp());

  const employee = await screen.findByText(/Joan of Arc/i);
  const searchInput = screen.getByLabelText("Search employees by name");

  expect(employee).toBeInTheDocument();
  expect(searchInput).toHaveValue("arbitrary");
});
