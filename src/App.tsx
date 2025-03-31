import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import BreweryTable from './components/BreweryTable';
import Header from './components/Header';
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
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 3px 15px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          backgroundColor: '#f5f5f5',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: '#f9f9f9',
          },
          '&:hover': {
            backgroundColor: '#f1f1f1',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        bgcolor: '#fafafa' 
      }}>
        <Header />
        <Container maxWidth="lg" sx={{ pb: 6 }}>
          <BreweryTable />
        </Container>
        <Box 
          component="footer" 
          sx={{ 
            py: 3, 
            textAlign: 'center',
            borderTop: '1px solid #eaeaea',
            mt: 4,
            color: 'text.secondary',
            fontSize: '0.875rem',
            bgcolor: 'white'
          }}
        >
          BrewFinder by Cristian Sarmiento
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
