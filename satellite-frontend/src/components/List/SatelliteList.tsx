import {
  Button,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDeleteSatelliteMutation, useLazyGetSatellitesQuery } from '~/api/satellite';
import { Satellite } from '~/types/satellite';
import { Iconify } from '~/components/Iconify';
import { MenuPopover } from '~/components/MenuPopover';
import {
  selectCurrentSatellite,
  selectFilterText,
  selectList,
  selectUpdateSearch,
  setCurrentSatellite,
  setList,
  setUpdateSearch,
} from '~/store/slices/satellite';
import { useAppSelector } from '~/hooks/useAppSelector';
import SatelliteDialog from '~/components/Dialog/SatelliteDialog';
import ConfirmDialog from '~/components/Dialog/ConfirmDialog';
import { enqueueSnackbar } from '~/components/Snackbar';
import { useAppDispatch } from '~/hooks/useAppDispatch';

export default function SatelliteList() {
  const [getSatellites, getSatellitesResult] = useLazyGetSatellitesQuery();
  const [deleteSatellite, deleteSatelliteResult] = useDeleteSatelliteMutation();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const updateSearch = useAppSelector(selectUpdateSearch);
  const filterText = useAppSelector(selectFilterText);
  const satellites = useAppSelector(selectList);
  const currentSatellite = useAppSelector(selectCurrentSatellite);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getSatellites();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getSatellites();
    // eslint-disable-next-line
  }, [updateSearch, filterText]);

  useEffect(() => {
    const { data, error } = getSatellitesResult;
    if (data) {
      if (filterText) {
        const filteredData = data.filter((satellite) => {
          return (
            satellite.name.startsWith(filterText) ||
            satellite.id.startsWith(filterText) ||
            satellite.owner.startsWith(filterText)
          );
        });
        dispatch(setList(filteredData));
      } else {
        dispatch(setList(data));
      }
    }
    error && console.log('error', error);
    // eslint-disable-next-line
  }, [getSatellitesResult, filterText]);

  const listItemOnClick = (element: any) => {
    dispatch(setCurrentSatellite(element));
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>, satellite: Satellite) => {
    setOpenPopover(event.currentTarget);
    dispatch(setCurrentSatellite(satellite));
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleOpenEditDialog = () => {
    handleClosePopover();
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDelete = () => {
    if (currentSatellite) {
      deleteSatellite(currentSatellite?.id);
    }
  };

  useEffect(() => {
    if (!deleteSatelliteResult.isUninitialized && !deleteSatelliteResult.isLoading) {
      if (deleteSatelliteResult.isError) {
        enqueueSnackbar('Failed to delete satellite', {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(
          'Satellite with id: ' + currentSatellite?.id + ' was deleted successfully!',
        );
        dispatch(setCurrentSatellite(null));
        dispatch(setUpdateSearch());
        handleCloseConfirm();
        handleClosePopover();
      }
    }
    // eslint-disable-next-line
  }, [deleteSatelliteResult]);

  return (
    <>
      <TableContainer sx={{ maxHeight: '600px' }}>
        <Table>
          <TableBody>
            {satellites?.map((element: Satellite, index: number) => (
              <TableRow
                sx={{
                  cursor: 'pointer',
                }}
                key={index}
                selected={currentSatellite?.id === element.id}
              >
                <TableCell onClick={(event) => event && listItemOnClick(element)}>
                  <Stack direction={'row'} spacing={1}>
                    <Iconify icon={'mdi:satellite-variant'} />
                    <Typography noWrap variant='inherit'>
                      {element.name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell
                  align='right'
                  sx={{
                    whiteSpace: 'nowrap',
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                >
                  <IconButton
                    onClick={(event) => {
                      handleOpenPopover(event, element);
                    }}
                  >
                    <Iconify icon='eva:more-vertical-fill' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {satellites.length === 0 && (
              <TableRow>
                <TableCell colSpan={12}>No data...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow='right-top'
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleOpenEditDialog}>
          <Iconify icon='eva:edit-outline' />
          Edit
        </MenuItem>
        <MenuItem onClick={handleOpenConfirm} sx={{ color: 'error.main' }}>
          <Iconify icon='eva:trash-2-outline' />
          Delete
        </MenuItem>
      </MenuPopover>

      <SatelliteDialog
        title={'Update'}
        open={openEditDialog}
        existingSatellite={currentSatellite}
        onClose={handleCloseEditDialog}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title='Delete'
        content={<>Are you sure you want to delete the satellite - {currentSatellite?.name}?</>}
        action={
          <Button
            variant='contained'
            color='error'
            startIcon={<Iconify icon='eva:close-fill' />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
