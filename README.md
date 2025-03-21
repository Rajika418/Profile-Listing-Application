# Profile Listing Application

A React-based profile listing application built with Vite for fast development. This project uses Redux for state management, Tailwind CSS for styling, and other essential libraries for performance and UI enhancements.

## Project Overview

This application demonstrates:
- Modern React development with Vite
- Redux state management with Redux Toolkit
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Client-side routing with React Router


Follow these steps to set up the project on your local machine.  

## Project Setup  

### 1. Create a New Vite Project  
```
npm create vite@latest Profile-Listing-Application --template react
```

### 2. Navigate to Project Directory  
```
cd Profile-Listing-Application
```

### 3. Install Dependencies  
```
#### Core Dependencies  

npm install


#### Styling  

npm install tailwindcss @tailwindcss/vite


#### State Management  

npm install @reduxjs/toolkit react-redux redux-persist


#### Routing  

npm install react-router-dom


#### UI and Networking  

npm install axios lucide-react framer-motion
```

## Development Process

Here's how I constructed this project step by step:

### 1. Project Initialization
- Set up a new Vite React project
- Configured the basic project structure

### 2. Tailwind CSS Integration
- Installed Tailwind CSS and the Vite plugin
- Added the @tailwindcss/vite plugin to Vite configuration
- Imported Tailwind CSS in the index.css file

### 3. Core Dependencies Installation
- *Axios*: For handling HTTP requests
- *Redux & Redux Toolkit*: For efficient state management
- *React Router*: For client-side navigation
- *Redux Persist*: For persisting state in local storage
- *Lucide React*: For modern, lightweight icons
- *Framer Motion*: For UI animations and transitions

### 4. State Management Implementation
- Set up Redux store configuration
- Created initial slices with basic reducers
- Configured the store with Redux Persist

### 5. Routing Configuration
- Implemented AppRouter for application routing
- Set up route structure for different pages

### 6. Redux Enhancement
- Added persistence layer with redux-persist
- Enhanced slices with actions and extra reducers
- Optimized state management patterns

### 7. UI Development
- Designed and implemented page layouts
- Styled components with Tailwind CSS
  
![Screenshot 2025-03-21 223124](https://github.com/user-attachments/assets/65ad3fcd-cb60-4e97-8362-bfca4e155ad1)

![Screenshot 2025-03-21 223329](https://github.com/user-attachments/assets/ff17c5d9-1bb1-44f4-9b83-c4ca57ff211e)

### 8. Animation Integration
- Added Framer Motion animations to components
- Implemented transitions between pages
- Enhanced user experience with subtle UI animations

### 9. Code Organization and Refactoring
- Restructured Redux files for better maintainability
- Moved slices folder into store folder
- Final code cleanup and optimization


### State Management in Profile Handling

1. Fetching Data from API and Storing in Redux State

   - fetchProfiles async function retrieves profile data from the API and updates the Redux store.
   - Data is stored in data array inside Redux state.
   - State properties:
     - data: Stores list of profiles.
     - loading: Boolean flag indicating if the API request is in progress.
     - error: Holds error message if API request fails.
     - success: Boolean flag indicating if the API request was successful.

2. Initializing the Redux Store

   - Redux store is created using configureStore with:
     - Reducers to handle state updates.
     - Middleware for async operations.
     - Persistence configuration using redux-persist.
   - Profile state is managed in profileSlice.js.

3. Persisting State Across Sessions

   - redux-persist ensures profile state persists after a page refresh.
   - Avoids unnecessary API calls and improves performance.

4. _Using State in Profile Listing Page (ProfileListing.jsx)_

   - ProfileListing retrieves profile data using useSelector from Redux.
   - State properties used:
     - data: Displays the list of profiles.
     - loading: Shows loading spinner while fetching.
     - error: Displays error message if fetch fails.
     - success: Triggers success message on successful load.
   - Local States:
     - searchTerm: Stores search input for filtering profiles.
     - currentPage: Tracks pagination.
     - itemsPerPage: Defines profiles per page.
     - showSuccess: Controls success message visibility.

5. _Navigating to Profile Details (ProfileDetails.jsx)_

   - client_id is passed as a route parameter in the handleViewDetails function.
   - User navigates to ProfileDetails page with selected client_id.

6. Retrieving and Displaying Profile Details
   - On the ProfileDetails page:
     - client_id is extracted from URL using useParams().
     - Profile is found in Redux state using: const profile = profiles.find((p) => p.client_id === clientId).
   - Profile details are displayed directly from Redux without additional API calls.
   - State properties used:
     - data: To retrieve profile list.
     - loading: Shows loader if needed.
     - error: Displays error if profile is not found.
