import React from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import SearchIcon from '@mui/icons-material/Search';

interface BreweryTableHeaderProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BreweryTableHeader: React.FC<BreweryTableHeaderProps> = ({ 
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <Box p={3} sx={{ 
      borderBottom: '1px solid #eaeaea',
      background: 'linear-gradient(145deg, #fcfcfc 0%, #f5f5f5 100%)'
    }}>
      <Box display="flex" alignItems="center" mb={1}>
        <LocalDrinkIcon sx={{ mr: 1, color: 'primary.main', fontSize: 28 }} />
        <Typography variant="h5" component="h1" gutterBottom sx={{ 
          mb: 0,
          background: 'linear-gradient(90deg, #8b5a2b 0%, #a67c52 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          Microbrewery List
        </Typography>
      </Box>
      
      <TextField
        label="Search by name or state"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={onSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      />
    </Box>
  );
};

export default BreweryTableHeader; 