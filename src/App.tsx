import { useState, useEffect, useContext, type MouseEvent } from 'react'
import { 
  Container, 
  Typography, 
  Box, 
  AppBar, 
  Toolbar, 
  IconButton,
  Card,
  CardContent,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Autocomplete,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { DataGrid, type GridRowsProp, type GridColDef } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import type { SelectChangeEvent } from '@mui/material'
import { SymbolsContextProvider } from './Context';
import { Table } from './components/Table';

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  breakpoints: {
    values: {
      // xs: 0,
      // sm: 600,
      // md: 960,
      // lg: 1280,
      // xl: 1920,
    },
  },
})

function App() {
  const [assetClass, setAssetClass] = useState('Futures');
  
  const handleChangeAssetClass = (
    event: MouseEvent<HTMLElement>,
    assetClass: string | null,
  ) => {
    setAssetClass(assetClass);
  };

  return (
    <SymbolsContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                Trade Intelligence
              </Typography>
            </Toolbar>
          </AppBar>
          
          <Container
            sx={{
              mt: 2,
            }}
          >
            <ToggleButtonGroup
              value={assetClass}
              exclusive
              onChange={handleChangeAssetClass}
              aria-label="Asset Class"
              sx={{
                width: '100%',
              }}
            >
              <ToggleButton value="Stocks" aria-label="Stocks">
                Stocks
              </ToggleButton>
              <ToggleButton value="Futures" aria-label="Futures">
                Futures
              </ToggleButton>
              <ToggleButton value="Crypto" aria-label="Crypto" disabled>
                Crypto
              </ToggleButton>
              <ToggleButton value="Forex" aria-label="Forex" disabled>
                Forex
              </ToggleButton>
            </ToggleButtonGroup>
          </Container>

          <Container
            sx={{
              mt: 2,
            }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Bullish
            </Typography>
            <Table />
          </Container>

          {/* <Container
            sx={{
              mt: 2,
            }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Bearish
            </Typography>
            <DataGrid rows={rows} columns={columns} />
          </Container> */}

      </ThemeProvider>
    </SymbolsContextProvider>
  )
}

export default App
