import React from 'react';
import { Stack } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
import StatsCard from './StatsCard';
import { BreweryStats } from '../types/brewery';

interface StatsSectionProps {
  stats: BreweryStats;
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <Stack 
      direction={{ xs: 'column', sm: 'row' }} 
      spacing={2} 
      sx={{ mb: 3 }}
    >
      <StatsCard 
        icon={<PlaceIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
        value={stats.totalBreweries}
        label="Microbreweries"
        bgColor="#f5eee6"
      />
      
      <StatsCard 
        icon={<PublicIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
        value={stats.states}
        label="States"
        bgColor="#f9f0e6"
      />
      
      <StatsCard 
        icon={<LanguageIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
        value={stats.withWebsites}
        label="With websites"
        bgColor="#fcf5eb"
      />
    </Stack>
  );
};

export default StatsSection; 