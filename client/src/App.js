import React, { useEffect } from "react";
import "./App.css";
import Home from "./components/home";
import Login from "./components/login";
import Rooms from  "./components/rooms";
import Register from "./components/register";
import BookingForm from "./components/booking";
import GuestDetail from "./components/guest-details";
import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "./store/authSlice";
import axios from 'axios';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8000/api/auth/user', {
        headers: {
          'token': token
        }
      })
      .then(response => {
        console.log("User data fetched: ", response.data);
        dispatch(setAuth({ user: response.data.user }));
      })
      .catch(error => {
        console.log("Error fetching user data: ", error.message);
      });
    }
  }, [dispatch]);

  const { isAuth } = useSelector((state) => state.authSlice);
  console.log("is auth ", isAuth);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/rooms" element={<Rooms />} />
          <Route exact path="/bookings" element={isAuth ? <BookingForm /> : <Navigate to={'/login'} />} />
          <Route exact path="/guest-details" element={isAuth ? <GuestDetail /> : <Navigate to={'/login'} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
