// @mui
import {
  Dialog,
  Button,
  TextField,
  DialogProps,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { defaultSatellite, Satellite } from '~/types/satellite';
import { enqueueSnackbar } from '../Snackbar';
import { Iconify } from '~/components/Iconify';
import { useCreateSatelliteMutation, usePutSatelliteMutation } from '~/api/satellite';
import { setCurrentSatellite, setUpdateSearch } from '~/store/slices/satellite';
import { useAppDispatch } from '~/hooks/useAppDispatch';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  title?: string;
  open: boolean;
  existingSatellite?: Satellite | null;
  onClose: VoidFunction;
}

export default function SatelliteDialog({
  title = 'Create',
  open,
  onClose,
  existingSatellite,
  ...other
}: Props) {
  const [satellite, setSatellite] = useState<Satellite>(defaultSatellite);

  const [createSatellite, createSatelliteResult] = useCreateSatelliteMutation();
  const [putSatellite, putSatelliteResult] = usePutSatelliteMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!createSatelliteResult.isUninitialized && !createSatelliteResult.isLoading) {
      if (createSatelliteResult.isError) {
        enqueueSnackbar('Failed to create satellite', {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(
          'Satellite with id: ' + createSatelliteResult.data.id + ' was created successfully!',
        );
        dispatch(setUpdateSearch());
        handleClose();
      }
    }
    // eslint-disable-next-line
  }, [createSatelliteResult]);

  useEffect(() => {
    if (!putSatelliteResult.isUninitialized && !putSatelliteResult.isLoading) {
      if (putSatelliteResult.isError) {
        enqueueSnackbar('Failed to update satellite', {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(
          'Satellite with id: ' + putSatelliteResult.data.id + ' was updated successfully!',
        );
        dispatch(setUpdateSearch());
        dispatch(setCurrentSatellite(putSatelliteResult.data));
        handleClose();
      }
    }
    // eslint-disable-next-line
  }, [putSatelliteResult]);

  useEffect(() => {
    if (existingSatellite) {
      setSatellite(existingSatellite);
    }
    // eslint-disable-next-line
  }, [open]);

  const handleClose = () => {
    setSatellite(defaultSatellite);
    onClose();
  };

  const handleSave = () => {
    if (!satellite.name) {
      enqueueSnackbar('Please fill a satellite name', {
        variant: 'error',
      });
      return;
    }
    if (!satellite.longitude) {
      enqueueSnackbar('Please fill the longitude', {
        variant: 'error',
      });
      return;
    }
    if (
      Number.parseFloat(satellite.longitude) > 180 ||
      Number.parseFloat(satellite.longitude) < -180
    ) {
      enqueueSnackbar('Longitude must be between -180 and 180', {
        variant: 'error',
      });
      return;
    }
    if (!satellite.latitude) {
      enqueueSnackbar('Please fill the latitude', {
        variant: 'error',
      });
      return;
    }
    if (Number.parseFloat(satellite.latitude) > 90 || Number.parseFloat(satellite.latitude) < -90) {
      enqueueSnackbar('Latitude must be between -90 and 90', {
        variant: 'error',
      });
      return;
    }
    if (existingSatellite) {
      putSatellite({ satellite: satellite, id: existingSatellite.id });
    } else {
      createSatellite({ satellite: satellite });
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <TextField
          fullWidth
          required={true}
          label='Name'
          value={satellite.name}
          onChange={(event) => {
            setSatellite((prevSatellite) => ({
              ...prevSatellite,
              name: event.target.value,
            }));
          }}
          sx={{ mb: 3 }}
        />
        {!existingSatellite && (
          <TextField
            fullWidth
            label='Owner'
            value={satellite.owner}
            onChange={(event) => {
              setSatellite((prevSatellite) => ({
                ...prevSatellite,
                owner: event.target.value,
              }));
            }}
            sx={{ mb: 3 }}
          />
        )}
        <TextField
          fullWidth
          type={'number'}
          required={true}
          InputProps={{
            inputProps: {
              max: 180,
              min: -180,
            },
          }}
          label='Longitude'
          value={satellite.longitude}
          onChange={(event) => {
            setSatellite((prevSatellite) => ({
              ...prevSatellite,
              longitude: event.target.value,
            }));
          }}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          InputProps={{
            inputProps: {
              max: 90,
              min: -90,
            },
          }}
          label='Latitude'
          required={true}
          type={'number'}
          value={satellite.latitude}
          onChange={(event) => {
            setSatellite((prevSatellite) => ({
              ...prevSatellite,
              latitude: event.target.value,
            }));
          }}
          sx={{ mb: 3 }}
        />
      </DialogContent>

      <DialogActions>
        <Button
          variant='contained'
          color='error'
          startIcon={<Iconify icon='eva:close-fill' />}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          startIcon={
            existingSatellite ? (
              <Iconify icon='eva:edit-fill' />
            ) : (
              <Iconify icon='eva:cloud-upload-fill' />
            )
          }
          onClick={handleSave}
        >
          {existingSatellite ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
