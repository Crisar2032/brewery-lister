import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TableSortLabel,
  Paper, 
  Typography, 
  Link, 
  Chip 
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Brewery, SortDirection, SortKey } from '../types/brewery';

interface BreweryTableContentProps {
  breweries: Brewery[];
  page: number;
  rowsPerPage: number;
  sortBy: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
}

const BreweryTableContent: React.FC<BreweryTableContentProps> = ({
  breweries,
  page,
  rowsPerPage,
  sortBy,
  sortDirection,
  onSort
}) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440, boxShadow: 'none' }}>
      <Table stickyHeader aria-label="brewery table">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'name'}
                direction={sortBy === 'name' ? sortDirection : 'asc'}
                onClick={() => onSort('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>City</TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'state'}
                direction={sortBy === 'state' ? sortDirection : 'asc'}
                onClick={() => onSort('state')}
              >
                State
              </TableSortLabel>
            </TableCell>
            <TableCell>Website</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {breweries
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((brewery) => (
              <TableRow key={brewery.id}>
                <TableCell sx={{ fontWeight: 'medium' }}>{brewery.name}</TableCell>
                <TableCell>{brewery.city}</TableCell>
                <TableCell>
                  <Chip 
                    label={brewery.state} 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#f0f0f0',
                      '&:hover': { backgroundColor: '#e5e5e5' }
                    }} 
                  />
                </TableCell>
                <TableCell>
                  {brewery.website_url ? (
                    <Link 
                      href={brewery.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Visit site
                      <OpenInNewIcon sx={{ ml: 0.5, fontSize: 16 }} />
                    </Link>
                  ) : (
                    <Typography variant="body2" color="text.secondary">N/A</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          {breweries.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  No breweries found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BreweryTableContent; 