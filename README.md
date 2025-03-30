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

- `src/components/BreweryTable.tsx`: Main component that manages the logic and display of the brewery table.
- `src/App.tsx`: Root component that configures the theme and layout.

## Possible Improvements

- Add more filtering options (by city, etc.)
- Implement testing with React Testing Library
- Add options to change the number of rows per page
- Implement a detailed view for each brewery
