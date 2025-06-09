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
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
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
      symbol: 'MES',
      description: 'Micro E-Mini S&P 500',
      last: 40002.25,
      percent_change: 0.01,
      price_leader: 'BEAR',
      volume_trend: 'BULL',
      volume: 12354
    },
    { id: 2,
      symbol: 'MNQ',
      description: 'Micro E-mini Nasdaq-100',
      last: 12415.25,
      percent_change: 0.01,
      price_leader: 'BULL',
      volume_trend: 'BEAR+',
      volume: 12354
    },
    { id: 3,
      symbol: 'M2K',
      description: 'Micro E-mini Russell 2000',
      last: 40002.75,
      percent_change: 0.01,
      price_leader: 'BULL',
      volume_trend: 'BULL+',
      volume: 12354
    },
    { id: 4,
      symbol: 'MYM',
      description: 'Micro E-mini Dow',
      last: 40002.25,
      percent_change: 0.01,
      price_leader: 'BEAR',
      volume_trend: 'BULL',
      volume: 12354
    },
  ];
  
  const columns: GridColDef[] = [
    { field: 'symbol', headerName: 'Symbol', width: 100 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'last', headerName: 'Last', width: 100 },
    { field: 'percent_change', headerName: '% Change', width: 100 },
    { field: 'price_leader', headerName: 'Price Leader', width: 100 },
    { field: 'volume_trend', headerName: 'Volume Trend', width: 100 },
    { field: 'volume', headerName: 'Volume', width: 100 },    
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
          <DataGrid rows={rows} columns={columns} />
        </Container>
    </ThemeProvider>
  )
}

export default App
