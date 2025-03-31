# Brewery Lister

A React application that displays a list of microbreweries using the OpenBreweryDB public API.

## Features

- **Microbrewery Listing**: Shows information of "micro" type breweries from the public [OpenBreweryDB](https://api.openbrewerydb.org/breweries) API.
- **Material UI Table**: Presents the data in a modern designed table.
- **Pagination**: Shows 5 breweries per page with navigation controls.
- **Search**: Allows filtering by name or state.
- **Sorting**: Allows sorting by name or state (ascending/descending).
- **Error Handling**: Shows error messages if the API doesn't respond correctly.
- **Loading Indicator**: Shows a spinner while the data is loading.
- **Statistics Dashboard**: Visual summary of key metrics.

## Technologies Used

- React 19
- TypeScript
- Material UI
- Fetch API

## How to Run the Application

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the application:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

The application follows a component-based architecture for better maintainability:

### Core Components

- `src/components/BreweryTable.tsx`: Main container component that manages state and data fetching.
- `src/components/BreweryTableHeader.tsx`: Header component with title and search functionality.
- `src/components/BreweryTableContent.tsx`: Table component that displays the brewery data with sorting.
- `src/components/StatsSection.tsx`: Statistics section that shows summary metrics.
- `src/components/StatsCard.tsx`: Reusable card component for displaying individual statistics.

### Types

- `src/types/brewery.ts`: Contains TypeScript interfaces and types used across components.

## Architecture Benefits

- **Improved Code Organization**: Clear separation of responsibilities.
- **Enhanced Maintainability**: Smaller, focused components are easier to update.
- **Reusability**: Components like StatsCard can be reused throughout the application.
- **Better Testing**: Components can be tested individually.

