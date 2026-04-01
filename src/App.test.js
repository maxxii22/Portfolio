import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio hero and AI action', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Emmanuel Akuma/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Explain Python logic with AI/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Featured Projects/i })).toBeInTheDocument();
});
