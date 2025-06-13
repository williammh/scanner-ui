import {
  useState,
  useEffect,
  useContext,
  type SetStateAction,
  type MouseEvent
} from 'react'
import { 
  Container, 
  Typography, 
  AppBar, 
  Toolbar, 
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { SymbolsContext, getSymbols } from './Context';
import { Table } from './components/Table';

function App() {
  const [assetClass, setAssetClass] = useState('Futures');
  const { allSymbols, setAllSymbols } = useContext(SymbolsContext);
  
  useEffect(() => {
		
    (async (): Promise<void> => {
			setAllSymbols(await getSymbols());
		})();

	}, []);

  useEffect(() => {
     console.log(allSymbols);
	}, [allSymbols]);

  // useEffect(() => {
  //   let i = 0
  //   const intervalSeconds = 2

  //   const timer = setInterval(() => {
  //     i++;
  //     console.log(i);
  //   }, intervalSeconds * 1000)

  //   return (() => {
  //     clearInterval(timer)
  //   })
  // }, [])
  
  const handleChangeAssetClass = (
    event: MouseEvent<HTMLElement>,
    assetClass: SetStateAction<string>,
  ) => {
    console.log(event);
    setAssetClass(assetClass);
  };

  return (
    <>
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

        <Container
          sx={{
            mt: 2,
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bearish
          </Typography>
          <Table />
        </Container>
    </>
  )
}

export default App
