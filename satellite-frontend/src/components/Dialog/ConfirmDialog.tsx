// @mui
import { Dialog, Button, DialogTitle, DialogActions, DialogContent } from '@mui/material';
// @mui
import { DialogProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface ConfirmDialogProps extends Omit<DialogProps, 'title'> {
  title: React.ReactNode;
  content?: React.ReactNode;
  action: React.ReactNode;
  open: boolean;
  onClose: VoidFunction;
}

// ----------------------------------------------------------------------

export default function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog fullWidth maxWidth='xs' open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

      <DialogActions>
        {action}

        <Button variant='contained' onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
