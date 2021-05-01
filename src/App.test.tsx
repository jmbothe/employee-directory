import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { EmployeeListItem } from "./domain/EmployeeListItem";
import { Runtime } from "./domain/Runtime";
import RuntimeContext from "./runtime/RuntimeContext";

// react-router-dom doesn't export LocationDescriptor interface.
let initialEntries: any;
let employees: EmployeeListItem[];
let pages: number;

// This is acceptable for a small test suit, but as the runtime grows and testing grows we'll need an adapter-test module.
const runtime: Runtime = {
  getEmployeeRepository: () => ({
    searchEmployees: jest.fn(() => Promise.resolve({ employees, pages })),
  }),
  getAppConfig: () => ({
    // Cuts significant time from tests that update the search text.
    textInputDebounce: 0
  })
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
  pages = 1;
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

  const employee = await screen.findByText("Joan of Arc");
  const searchInput = screen.getByLabelText("Search employees by name");

  expect(employee).toBeInTheDocument();
  expect(searchInput).toHaveValue("arbitrary");
});

test("should paginate", async () => {
  employees = [{ id: "1", name: "Joan of Arc" }];
  pages = 2;

  render(renderApp());

  userEvent.type(
    screen.getByLabelText("Search employees by name"),
    "Arbitrary string cuz we're not testing the API"
  );

  const paginationText = await screen.findByText("Page 1 of 2");
  const prevButton = await screen.findByText("< prev");
  const nextButton = await screen.findByText("next >");

  expect(paginationText).toBeInTheDocument();
  expect(prevButton).toBeDisabled();
  expect(nextButton).not.toBeDisabled();

  userEvent.click(nextButton);

  const paginationTextUpdated = await screen.findByText("Page 2 of 2");

  expect(paginationTextUpdated).toBeInTheDocument();
  expect(prevButton).not.toBeDisabled();
  expect(nextButton).toBeDisabled();
});

test('should paginate on first load when url has "page" query param', async () => {
  initialEntries = ["/employees?name=arbitrary&page=2"];
  employees = [{ id: "1", name: "Joan of Arc" }];
  pages = 2;

  render(renderApp());

  const paginationText = await screen.findByText("Page 2 of 2");
  const prevButton = await screen.findByText("< prev");
  const nextButton = await screen.findByText("next >");

  expect(paginationText).toBeInTheDocument();
  expect(prevButton).not.toHaveAttribute(
    "class",
    "pagination-button--disabled"
  );
  expect(nextButton).toBeDisabled();
});

// Pending error handling/messaging.
test("should ignore bad query params", async () => {
  initialEntries = [
    "/employees?name=index1&name=index2&page=index1&page=index2",
  ];

  render(renderApp());

  // basically just testing that it doesn't barf.
  const mainHeading = screen.getByText("Employee Directory");

  expect(mainHeading).toBeInTheDocument();
});

test("should disable pagination with only one page of results", async () => {
  employees = [{ id: "1", name: "Joan of Arc" }];

  render(renderApp());

  userEvent.type(
    screen.getByLabelText("Search employees by name"),
    "Arbitrary string cuz we're not testing the API"
  );

  const paginationText = await screen.findByText("Page 1 of 1");
  const prevButton = await screen.findByText("< prev");
  const nextButton = await screen.findByText("next >");

  expect(paginationText).toBeInTheDocument();
  expect(prevButton).toBeDisabled();
  expect(nextButton).toBeDisabled();
});
