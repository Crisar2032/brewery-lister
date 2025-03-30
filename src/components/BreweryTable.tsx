import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TablePagination, 
  CircularProgress, 
  TextField, 
  Typography, 
  Link, 
  Box,
  Alert,
  TableSortLabel
} from '@mui/material';

interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  city: string;
  state: string;
  website_url: string | null;
}

type SortDirection = 'asc' | 'desc';
type SortKey = 'name' | 'state';

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

  const sortBreweries = (breweriesList: Brewery[]) => {
    return [...breweriesList].sort((a, b) => {
      const valueA = a[sortBy].toLowerCase();
      const valueB = b[sortBy].toLowerCase();
      
      if (sortDirection === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  };

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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          Microbrewery List
        </Typography>
        
        <TextField
          label="Search by name or state"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>
      
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="brewery table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'name'}
                  direction={sortBy === 'name' ? sortDirection : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>City</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'state'}
                  direction={sortBy === 'state' ? sortDirection : 'asc'}
                  onClick={() => handleSort('state')}
                >
                  State
                </TableSortLabel>
              </TableCell>
              <TableCell>Website</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBreweries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((brewery) => (
                <TableRow key={brewery.id}>
                  <TableCell>{brewery.name}</TableCell>
                  <TableCell>{brewery.city}</TableCell>
                  <TableCell>{brewery.state}</TableCell>
                  <TableCell>
                    {brewery.website_url ? (
                      <Link 
                        href={brewery.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Visit site
                      </Link>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            {filteredBreweries.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No breweries found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
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
      />
    </Paper>
  );
};

export default BreweryTable; 