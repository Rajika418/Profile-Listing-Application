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

 1.Fetching Data from API and Storing in Redux State
  -> The fetchProfiles async function retrieves data from the API and updates the Redux store.
  -> The response is stored in an array (data) inside the Redux state.
  -> The following state properties track the API request lifecycle:
        data: Stores the list of profiles.
        loading: Boolean flag indicating if the API request is in progress.
        error: Holds any error message if the API request fails.
        success: Boolean flag indicating if the API request was successful. 

 2.Initializing the Redux Store
  -> The Redux store is created using configureStore and includes:
        Reducers to handle state updates.
        Middleware for async operations.
        Persistence configurations using redux-persist.
  -> The profiles state is managed in profileSlice.js, where actions update the state accordingly.

 3.Persisting State Across Sessions
  -> redux-persist ensures that the profiles state remains stored even after a page refresh.
  -> This avoids unnecessary API calls and improves performance.

 4.Using State in Profile Listing Page (ProfileListing.js)
  -> The ProfileListing component retrieves profile data using useSelector from Redux.
  -> The following state properties are used:
       data: Displays the list of profiles.
       loading: Shows a loading spinner while fetching data.
       error: Displays an error message if fetching fails.
       success: Triggers a success message when profiles load successfully.
  -> Additional Local States:
       searchTerm: Stores the search input value for filtering profiles.
       currentPage: Keeps track of the pagination state.
       itemsPerPage: Defines how many profiles to show per page.
       showSuccess: Controls visibility of the success message.
 
5.Navigating to Profile Details (ProfileDetails.js)
 -> When a user clicks "View Details," the client_id is passed as a route parameter in the handleViewDetails function.
 -> The user is navigated to the ProfileDetails page with the selected client_id.    
         
6.Retrieving and Displaying Profile Details
 -> On the ProfileDetails page:
 -> The client_id is extracted from the URL using useParams().
 -> The profile is found in the Redux state using:
      const profile = profiles.find((p) => p.client_id === clientId);
      
 -> The details are displayed directly from Redux without making another API call.
 -> The page also uses:
     data: To retrieve the profile list.
     loading: To show a loader if necessary.
     error: To display an error message if the profile is not found.
