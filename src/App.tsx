import {
  useState,
  useEffect,
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
import { Table } from './components/Table';

// const serverAddress = "https://pizza-chairs-brazilian-flood.trycloudflare.com"
const serverAddress = "http://0.0.0.0:8000"

const App = () => {
  const [assetClass, setAssetClass] = useState('futures');
  const [futuresData, setFuturesData] = useState();
  const [stocksData, setstocksData] = useState();

  const [lastUpdated, setLastUpdated] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const isTopOfMinute = now.getSeconds() == 0;
      
      if (isTopOfMinute) {
        console.log(`TOP OF MINUTE ${now.toUTCString()}`);
      }

      if ((isTopOfMinute || !futuresData) && assetClass === 'futures') {
        const getFutures = async () => {
          const response = await fetch(`${serverAddress}/futures`);
          const result = await response.json();
          console.log(result.futures);
          setFuturesData(result.futures);
          
          for (let key in result.futures) {
            const len = result.futures[key]['minute_bars'].length - 1;
            const lastUpdated = result.futures[key]['minute_bars'][len]['TimeStamp'];
            setLastUpdated(lastUpdated);
            break;
          }

        }
        getFutures();
      }

    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [futuresData]);

  
  const handleChangeAssetClass = (
    _event: React.MouseEvent<HTMLElement>,
    value: string | null
  ) => {
    if (value !== null) {
      setAssetClass(value);
    }
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
            MarketCrush
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
        <Typography
          variant="body1"
          sx={{
            display: 'inline-flex',
            marginLeft: 1
          }}
        >
            {lastUpdated}
        </Typography>
      </Container>

      <Container
        sx={{
          mt: 2,
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bullish
        </Typography>
        <Table symbolData={futuresData} direction='bullish' />
      </Container>

      <Container
        sx={{
          mt: 2,
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bearish
        </Typography>
        <Table symbolData={futuresData} direction='bearish' />
      </Container>
    </>
  )
}

export default App
