import React, { useState } from "react";
import "./index.css";
import logo from "./cimfr-logo.jpg";
import {  Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const { user } = useSelector((state) => state.authSlice);
  console.log("inside navbar user", user);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setAuth({ user: null }));
  };

  return (
    <header>
      <div className="container">
        <input
          type="checkbox"
          id="check"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <div className="logo-container">
          <img src={logo} alt="" />
          <h3 className="logo">
            CIMFR <span>Guesthouse</span>
          </h3>
        </div>

        <div className="nav-btn">
          <div className="nav-links">
            <ul>
              <li className="nav-link" style={{ "--i": ".6s" }}>
                <Link to="/">Home</Link>
              </li>
              <li className="nav-link" style={{ "--i": ".85s" }}>
                {!user && (
                  <li className="nav-link" style={{ "--i": ".85s" }}>
                    <Link to="/register">Guest Registration</Link>
                  </li>
                )}
              </li>
              <li className="nav-link" style={{ "--i": "1.1s" }}>
              <Link to="/rooms">View Rooms</Link>
              </li>
              <li className="nav-link" style={{ "--i": "1.20s" }}>
              <Link to="guest-details">Booking Status</Link>
              </li>
              <li className="nav-link" style={{ "--i": "1.35s" }}>
              <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="log-sign" style={{ "--i": "1.8s" }}>
          {user ? (
            <div className="user-avatar">
              <button className="btn transparent" onClick={handleLogout}>
                logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn transparent">
              Login
            </Link>
          )}
        </div>

        <div className="hamburger-menu-container">
          <div className="hamburger-menu">
            <div></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
