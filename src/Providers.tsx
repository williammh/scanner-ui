import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { getSymbols, SymbolsContext, SymbolsContextProvider } from './Context';

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

export const Providers = (props) => {

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
  });

  // const { allSymbols, setAllSymbols } = useContext(SymbolsContext);
  
  // useEffect(() => {
		
  //   (async (): Promise<void> => {
	// 		setAllSymbols(await getSymbols());
	// 	})();

	// }, []);

  // useEffect(() => {
  //   console.log(allSymbols);
	// }, [allSymbols]);



  return (
    <SymbolsContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </SymbolsContextProvider>
  )
}

