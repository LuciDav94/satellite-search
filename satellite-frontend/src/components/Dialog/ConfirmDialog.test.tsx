import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDialog from './ConfirmDialog';
import { Button } from '@mui/material';

test('renders the ConfirmDialog component', () => {
  const onClose = jest.fn();

  render(
    <ConfirmDialog
      title='Confirmation'
      content='Are you sure?'
      action={<Button>Confirm</Button>}
      open={true}
      onClose={onClose}
    />,
  );

  // Verify the presence of dialog elements
  const titleElement = screen.getByText('Confirmation');
  const contentElement = screen.getByText('Are you sure?');
  const actionElement = screen.getByText('Confirm');
  const cancelButton = screen.getByRole('button', { name: 'Cancel' });

  expect(titleElement).toBeTruthy();
  expect(contentElement).toBeTruthy();
  expect(actionElement).toBeTruthy();
  expect(cancelButton).toBeTruthy();

  // Simulate click on the cancel button
  fireEvent.click(cancelButton);

  // Verify that onClose function is called
  expect(onClose).toHaveBeenCalled();
  expect(onClose).toHaveBeenCalledTimes(1);
});
