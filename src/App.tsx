import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import BreweryTable from './components/BreweryTable';
import './App.css';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#8b5a2b', // Brown color to represent beer
    },
    secondary: {
      main: '#f9c784', // Light amber color
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <BreweryTable />
      </Container>
    </ThemeProvider>
  );
}

export default App;
