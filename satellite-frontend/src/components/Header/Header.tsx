import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import { Iconify } from '~/components/Iconify';
import { useState } from 'react';
import SatelliteDialog from '~/components/Dialog/SatelliteDialog';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { selectFilterText, setCurrentSatellite, setFilterText } from '~/store/slices/satellite';
import { useAppSelector } from '~/hooks/useAppSelector';

export default function Header() {
  const [openDialog, setOpenDialog] = useState(false);

  const filterText = useAppSelector(selectFilterText);

  const dispatch = useAppDispatch();

  const handleFilterText = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterText(event.target.value));
    dispatch(setCurrentSatellite(null));
  };

  const handleClearAll = () => {
    dispatch(setFilterText(''));
    dispatch(setCurrentSatellite(null));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Stack
      spacing={2.5}
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      justifyContent='space-between'
      sx={{ mb: 5 }}
    >
      <Stack
        spacing={1}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ md: 'center' }}
        sx={{ width: 1 }}
      >
        <TextField
          size='medium'
          value={filterText}
          sx={{ width: '80%' }}
          onChange={handleFilterText}
          placeholder='Search after id,name or owner...'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
        {!!filterText && (
          <Button
            color='error'
            onClick={handleClearAll}
            startIcon={<Iconify icon='eva:trash-2-outline' />}
          >
            Clear
          </Button>
        )}
      </Stack>
      <Button
        variant='contained'
        startIcon={<Iconify icon='eva:cloud-upload-fill' />}
        onClick={handleOpenDialog}
      >
        Add
      </Button>

      <SatelliteDialog open={openDialog} onClose={handleCloseDialog} />
    </Stack>
  );
}
