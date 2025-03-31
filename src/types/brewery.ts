export interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  city: string;
  state: string;
  website_url: string | null;
}

export type SortDirection = 'asc' | 'desc';
export type SortKey = 'name' | 'state';

export interface BreweryStats {
  totalBreweries: number;
  states: number;
  withWebsites: number;
} 