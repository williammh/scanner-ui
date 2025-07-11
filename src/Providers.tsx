import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { getSymbols, SymbolsContext, SymbolsContextProvider } from './Context';

export const Providers = (props) => {

  const theme = createTheme({
    palette: {
      mode: 'dark',
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
  
  return (
    <SymbolsContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </SymbolsContextProvider>
  )
}

