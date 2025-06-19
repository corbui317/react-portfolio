import { render, screen } from '@testing-library/react';
import App from './App';

test('renders site logo', () => {
  render(<App />);
  const logoElement = screen.getByText(/Corey Bui/i);
  expect(logoElement).toBeInTheDocument();
});
