import React, { useState, useEffect, useCallback } from 'react';
import { 
  Paper, 
  TablePagination, 
  CircularProgress, 
  Box,
  Alert,
  Divider
} from '@mui/material';
import { Brewery, SortDirection, SortKey, BreweryStats } from '../types/brewery';
import StatsSection from './StatsSection';
import BreweryTableHeader from './BreweryTableHeader';
import BreweryTableContent from './BreweryTableContent';

const BreweryTable: React.FC = () => {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [filteredBreweries, setFilteredBreweries] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [sortBy, setSortBy] = useState<SortKey>('name');

  const sortBreweries = useCallback((breweriesList: Brewery[]) => {
    return [...breweriesList].sort((a, b) => {
      const valueA = a[sortBy].toLowerCase();
      const valueB = b[sortBy].toLowerCase();
      
      if (sortDirection === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  }, [sortBy, sortDirection]);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.openbrewerydb.org/breweries');
        
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        
        const data = await response.json();
        // Filter only microbreweries
        const microBreweries = data.filter((brewery: Brewery) => 
          brewery.brewery_type === "micro"
        );
        
        setBreweries(microBreweries);
        setFilteredBreweries(microBreweries);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  // Stats calculation
  const calculateStats = (): BreweryStats => {
    // Find unique states
    const uniqueStates = new Set(breweries.map(brewery => brewery.state));
    
    // Count breweries with websites
    const breweriesWithWebsites = breweries.filter(brewery => brewery.website_url).length;
    
    return {
      totalBreweries: breweries.length,
      states: uniqueStates.size,
      withWebsites: breweriesWithWebsites
    };
  };
  
  const stats = calculateStats();

  useEffect(() => {
    // Filter and sort by search term
    let filtered = breweries.filter(brewery => 
      brewery.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      brewery.state.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Sort the results
    filtered = sortBreweries(filtered);
    
    setFilteredBreweries(filtered);
    setPage(0);
  }, [searchTerm, breweries, sortBy, sortDirection, sortBreweries]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      // If we're already sorting by this column, change direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If it's a new column, set as ascending
      setSortBy(key);
      setSortDirection('asc');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error: {error}</Alert>;
  }

  return (
    <Box>
      {/* Stats Cards */}
      <StatsSection stats={stats} />

      {/* Brewery Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
        {/* Table Header with Search */}
        <BreweryTableHeader 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        
        {/* Table Content */}
        <BreweryTableContent 
          breweries={filteredBreweries}
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
        
        <Divider />
        
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={filteredBreweries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
          }
          sx={{
            borderTop: '1px solid #eaeaea',
            '.MuiTablePagination-selectIcon': {
              color: 'primary.main'
            },
            '.MuiTablePagination-actions button': {
              color: 'primary.main'
            }
          }}
        />
      </Paper>
    </Box>
  );
};

export default BreweryTable; 