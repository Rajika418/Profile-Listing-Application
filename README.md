Profile Listing Application.
A React-based profile listing application built with Vite for fast development. This project uses Redux for state management, Tailwind CSS for styling, and other essential libraries for performance and UI enhancements.

Project setup instructions.
Follow these steps to set up the project on my local machine.

     1.Create vite + React Project
     -> npm create vite@latest Profile-Listing-Application --template react

     2.Moves into the newly created project folder
     -> cd Profile-Listing-Application

     3.Installed and Configured Tailwind CSS
     -> npm install tailwindcss @tailwindcss/vite :- npm install tailwindcss @tailwindcss/vite.
     -> Add the @tailwindcss/vite plugin to my Vite configuration.
     -> @import "tailwindcss" :- imports Tailwind CSS to my index.css file.

     4.Install Required Packages
     -> axios:npm install axios :- Handles HTTP requests.
     -> redux & @reduxjs/toolkit:npm install @reduxjs/toolkit react-redux :- Implements Redux state management efficiently
     -> react-router-dom: npm install react-router-dom :- Manages client-side navigation.
     -> redux-persist: npm install redux-persist :- Persists Redux store data in local storage.
     -> lucide-react: npm install lucide-react  :- Offers lightweight modern icons.
     -> framer-motion: npm install framer-motion  :-  Adds animations and transitions for better UI/UX.

     5.Configured redux and router

     6.Refactor redux

     7.Designed Pages

     8.Framer motion animation

     9.Refactored redux

State Management in Profile Handling

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

4. _Using State in Profile Listing Page (ProfileListing.js)_
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

5. _Navigating to Profile Details (ProfileDetails.js)_

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
