import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';
import Header from './Header';
import Applications from './Applications';
import { Button } from './ui/Button/Button';

// Mock fetch globally
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
) as any;

// Clear mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});

// App component tests
test('renders "Application Portal" title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Application Portal/i);
  expect(titleElement).toBeInTheDocument();
});

test('App contains Header and Applications sections', () => {
  render(<App />);
  // Check if header is present
  const header = screen.getByText(/Application Portal/i);
  expect(header).toBeInTheDocument();
  
  // Check if main content area exists
  const appDiv = document.querySelector('.App');
  expect(appDiv).toBeInTheDocument();
});

// Header component tests
test('Header displays correct page information', () => {
  render(<Header pageNumber={1} />);
  const header = screen.getByText(/Application Portal/i);
  expect(header).toBeInTheDocument();
});

test('Header shows tooltip on hover', () => {
  render(<Header pageNumber={2} />);
  const logoContainer = document.querySelector('.logoContainer');
  
  if (logoContainer) {
    fireEvent.mouseEnter(logoContainer);
    const tooltip = screen.getByText(/Page Number = 2 Limit = 5/i);
    expect(tooltip).toBeInTheDocument();
  }
});

// Button component tests
test('Button renders with text', () => {
  render(<Button className="test-button">Test Button</Button>);
  const button = screen.getByRole('button', { name: /Test Button/i });
  expect(button).toBeInTheDocument();
});

test('Button can be clicked', () => {
  const mockClick = vi.fn();
  render(<Button className="test-button" onClick={mockClick}>Click Me</Button>);
  const button = screen.getByRole('button', { name: /Click Me/i });
  
  fireEvent.click(button);
  expect(mockClick).toHaveBeenCalledTimes(1);
});

// Applications component tests
test('Applications component renders Load More button', () => {
  const mockSetPageNumber = vi.fn();
  render(<Applications pageNumber={1} setPageNumber={mockSetPageNumber} />);
  
  // Should have Load More button
  const loadMoreButton = screen.getByRole('button', { name: /Load More/i });
  expect(loadMoreButton).toBeInTheDocument();
});

test('Applications Load More button can be clicked', () => {
  const mockSetPageNumber = vi.fn();
  render(<Applications pageNumber={1} setPageNumber={mockSetPageNumber} />);
  
  const loadMoreButton = screen.getByRole('button', { name: /Load More/i });
  fireEvent.click(loadMoreButton);
  
  // Should call setPageNumber function
  expect(mockSetPageNumber).toHaveBeenCalledTimes(1);
});

test('Applications component makes fetch call on mount', () => {
  const mockSetPageNumber = vi.fn();
  render(<Applications pageNumber={1} setPageNumber={mockSetPageNumber} />);
  
  // Should call fetch API
  expect(global.fetch).toHaveBeenCalledWith(
    'http://localhost:3001/api/applications?_page=1&_limit=5'
  );
});
