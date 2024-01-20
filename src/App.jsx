import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./Pages/IndexPage";
import Login from "./Components/Login";
import RegisterForm from "./Components/RegisterForm";
import AccountPage from "./Pages/AccountPage";
import ListingDetails from "./Components/Listing/ListingDetails";

import ListingForm from "./Components/ListingForm/ListingForm";
import { UserContextProvider } from "./UserContext";
import BookingDetails from "./Components/BookingDetails";

const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/listings/:id" element={<ListingDetails />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/userlistings/:id" element={<ListingForm />} />
            <Route path="/listings/new" element={<ListingForm />} />

            <Route path="/booking/:id" element={<BookingDetails/>} />

          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
