import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface StatsCardProps {
  icon: React.ReactElement;
  value: number;
  label: string;
  bgColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, value, label, bgColor }) => {
  return (
    <Paper sx={{ 
      p: 3,
      flex: 1, 
      display: 'flex', 
      alignItems: 'center',
      background: `linear-gradient(145deg, ${bgColor} 0%, #ffffff 100%)`,
      transition: 'transform 0.3s',
      '&:hover': {
        transform: 'translateY(-4px)',
      }
    }}>
      <Box sx={{ mr: 3 }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="h3" component="p" fontWeight="bold">
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatsCard; 