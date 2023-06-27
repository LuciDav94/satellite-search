import { render, screen } from '@testing-library/react';
import ThemeSwitch from './ThemeSwitch';

test('renders the ThemeSwitch component', () => {
  const toggleTheme = jest.fn();

  // Render the component
  render(<ThemeSwitch toggleTheme={toggleTheme} checked={false} />);

  // Verify the presence of text and switch element
  const darkText = screen.getByText('Dark');
  const lightText = screen.getByText('Light');

  expect(darkText).toBeTruthy();
  expect(lightText).toBeTruthy();
});
