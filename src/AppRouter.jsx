import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfileDetails from "./pages/ProfileDetails";
import ProfileListing from "./pages/ProfileListing";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfileListing />} />
        <Route path="/profile-details/:id" element={<ProfileDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
