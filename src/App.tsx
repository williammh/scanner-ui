import { useState, type MouseEvent } from 'react'
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
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import type { SelectChangeEvent } from '@mui/material'

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

  const rows: GridRowsProp = [
    {
      id: 1,
      symbol: 'MESM25',
      description: 'Micro E-Mini S&P 500',
      price: 40002.25,
      percent_change_today: '3%',
      gap_percent_today: '12%',
      percent_from_hod: '90%',
      '5_min_or_relative_volume': '4%',
      '15_min_or_relative_volume': '200%',
      '60_min_or_relative_volume': 'N/A',
      '5_day_percent_change': '5%',
      '30_day_percent_change': '20%',
      '5_min_bar_reversal': true,
      '15_min_bar_reversal': false,
      'volume': 12354
    },
    { id: 2,
      symbol: 'MNQM25',
      description: 'Micro E-mini Nasdaq-100',
      price: 12415.25,
      percent_change_today: '3%',
      gap_percent_today: '12%',
      percent_from_hod: '90%',
      '5_min_or_relative_volume': '4%',
      '15_min_or_relative_volume': '200%',
      '60_min_or_relative_volume': 'N/A',
      '5_day_percent_change': '5%',
      '30_day_percent_change': '20%',
      '5_min_bar_reversal': true,
      '15_min_bar_reversal': false,
      'volume': 12354
    },
    { id: 3,
      symbol: 'M2KM25',
      description: 'Micro E-mini Russell 2000',
      price: 40002.75,
      percent_change_today: '3%',
      gap_percent_today: '12%',
      percent_from_hod: '90%',
      '5_min_or_relative_volume': '4%',
      '15_min_or_relative_volume': '200%',
      '60_min_or_relative_volume': 'N/A',
      '5_day_percent_change': '5%',
      '30_day_percent_change': '20%',
      '5_min_bar_reversal': true,
      '15_min_bar_reversal': false,
      'volume': 12354
    },
    { id: 4,
      symbol: 'MYMM25',
      description: 'Micro E-mini Dow',
      price: 40002.25,
      percent_change_today: '3%',
      gap_percent_today: '12%',
      percent_from_hod: '90%',
      '5_min_or_relative_volume': '4%',
      '15_min_or_relative_volume': '200%',
      '60_min_or_relative_volume': 'N/A',
      '5_day_percent_change': '5%',
      '30_day_percent_change': '20%',
      '5_min_bar_reversal': true,
      '15_min_bar_reversal': false,
      'volume': 12354
    },
  ];
  
  const columns: GridColDef[] = [
    { field: 'symbol', headerName: 'Symbol', width: 100 },
    // { field: 'description', headerName: 'Description', width: 200 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'volume', headerName: 'Volume', width: 100 },
    { field: 'percent_change_today', headerName: '% Change Today', width: 140 },
    { field: 'gap_percent_today', headerName: '% Gap Today', width: 120 },
    { field: 'percent_from_hod', headerName: '% from HOD', width: 100 },
    { field: '5_min_or_relative_volume', headerName: '5 min OR Relative Volume', width: 180 },
    { field: '15_min_or_relative_volume', headerName: '15 min OR Relative Volume', width: 180 },
    { field: '60_min_or_relative_volume', headerName: '60 min OR Relative Volume', width: 180 },
    { field: '5_day_percent_change', headerName: '5 Day % Change', width: 140 },
    { field: '30_day_percent_change', headerName: '30 Day % Change ', width: 140 },
    { field: '5_min_bar_reversal', headerName: '5 min 3 Bar Reversal', width: 140 },
    { field: '15_min_bar_reversal', headerName: '15 min 3 Bar Reversal', width: 140 },
  ];
  
  console.log(assetClass);

  return (
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
          <DataGrid rows={rows} columns={columns} />
        </Container>

        <Container
          sx={{
            mt: 2,
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bearish
          </Typography>
          <DataGrid rows={rows} columns={columns} />
        </Container>
    </ThemeProvider>
  )
}

export default App
