import SatelliteList from '~/components/List/SatelliteList';
import { createTheme, Grid, ThemeProvider } from '@mui/material';
import Header from '~/components/Header/Header';
import SatelliteMap from '~/components/Map/SatelliteMap';
import { useState } from 'react';
import ThemeSwitch from '~/components/ThemeSwitch/ThemeSwitch';
import { styled } from '@mui/material/styles';

function App() {
  const lightThemeOptions = {
    palette: {
      primary: {
        main: '#007bff',
        lighter: '#007bff',
        darker: '#007bff',
      },
    },
    // ... other theme options for the light theme
  };

  const darkThemeOptions = {
    palette: {
      primary: {
        main: '#0b0c0c',
        lighter: '#0b0c0c',
        darker: '#0b0c0c',
      },
    },
    // ... other theme options for the dark theme
  };

  const [themeOptions, setThemeOptions] = useState(lightThemeOptions);

  // Function to switch between theme options
  const toggleTheme = () => {
    if (themeOptions.palette.primary.main === lightThemeOptions.palette.primary.main) {
      setThemeOptions(darkThemeOptions);
    } else {
      setThemeOptions(lightThemeOptions);
    }
  };

  const RootStyle = styled('div')(() => ({
    flexGrow: 1,
    padding: '70px',
  }));

  return (
    <ThemeProvider theme={createTheme(themeOptions)}>
      <RootStyle>
        <ThemeSwitch
          checked={themeOptions.palette.primary.main === lightThemeOptions.palette.primary.main}
          toggleTheme={toggleTheme}
        />
        <Header />
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <SatelliteList />
          </Grid>
          <Grid item xs={10}>
            <SatelliteMap />
          </Grid>
        </Grid>
      </RootStyle>
    </ThemeProvider>
  );
}

export default App;
