import React from 'react';
import { AppBar, Toolbar, Typography, Box, useTheme } from '@mui/material';
import LocalBarIcon from '@mui/icons-material/LocalBar';

const Header: React.FC = () => {
  const theme = useTheme();
  
  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid #eaeaea',
        background: '#fff',
        mb: 3
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center">
          <LocalBarIcon 
            sx={{ 
              fontSize: 36, 
              mr: 1.5,
              color: theme.palette.primary.main
            }} 
          />
          <Typography 
            variant="h4" 
            component="h1"
            sx={{ 
              fontWeight: 700,
              color: theme.palette.primary.main,
              letterSpacing: '-0.5px'
            }}
          >
            Brew
            <Box 
              component="span" 
              sx={{ 
                color: theme.palette.secondary.main,
                fontWeight: 900
              }}
            >
              Finder
            </Box>
          </Typography>
        </Box>
        
        <Box flexGrow={1} />
        
        <Typography 
          variant="body2" 
          sx={{ 
            opacity: 0.7,
            fontStyle: 'italic'
          }}
        >
          Discover the best microbreweries
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 