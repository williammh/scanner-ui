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

const App = () => {
  const [assetClass, setAssetClass] = useState('futures');
  const { allSymbols, setAllSymbols } = useContext(SymbolsContext);
  const [bullishTable, setBullishTable] = useState();

  
  useEffect(() => {
		
    (async (): Promise<void> => {
			setAllSymbols(await getSymbols());
		})();

    if (assetClass === 'futures') {
      const getFutures = async () => {
        const response = await fetch("http://localhost:8000/futures");
        const result = await response.json();
        setBullishTable(result.futures);
      }
      
      getFutures();
    }

	}, [assetClass]);


  useEffect(() => {
     console.log(allSymbols);
	}, [allSymbols]);

  
  const handleChangeAssetClass = (
    event: MouseEvent<HTMLElement>,
    assetClass: SetStateAction<string>,
  ) => {
    // console.log(event);
    // console.log(assetClass);
    setAssetClass(event.target.value);
  };

  // console.log(`assetClass: ${assetClass}`);
  // console.log(bullishTable);

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
          <ToggleButton value="stocks" aria-label="Stocks">
            Stocks
          </ToggleButton>
          <ToggleButton value="futures" aria-label="Futures">
            Futures
          </ToggleButton>
          <ToggleButton value="crypto" aria-label="Crypto" disabled>
            Crypto
          </ToggleButton>
          <ToggleButton value="forex" aria-label="Forex" disabled>
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
        <Table tableData={bullishTable} />
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
