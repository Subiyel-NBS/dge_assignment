import { render, screen } from '@testing-library/react';
import App from './App';

test('renders social support application', () => {
  render(<App />);
  const titleElement = screen.getByText(/Social Support Application/i);
  expect(titleElement).toBeInTheDocument();
});
