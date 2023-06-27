import { FormControlLabel, Stack, Switch, Typography } from '@mui/material';

interface Props {
  checked: boolean;
  toggleTheme: VoidFunction;
}

export default function ThemeSwitch({ toggleTheme, checked }: Props) {
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={1}>
      <Typography>Dark</Typography>
      <FormControlLabel
        value='start'
        control={<Switch checked={checked} onChange={toggleTheme} name='Light' />}
        label='Light'
        labelPlacement='end'
      />
    </Stack>
  );
}
