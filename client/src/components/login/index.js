import React, { useState } from 'react';
import './index.css';
import { FaUser, FaLock } from 'react-icons/fa';
import logo from './logo.png';
import axios from 'axios'; // Import Axios
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setAuth } from '../../store/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', formData); // Use Axios instead of fetch

      if (response.status === 200) {
        console.log(response.data);
        const { data } = response;
        console.log("data",data);
        dispatch(setAuth({user: data.user }));
        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
        navigate('/')
        setFormData({
          email: '',
          password: '',
        });
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt('Please enter your email for password reset:');

    if (!email) return;

    try {
      const response = await axios.post('http://localhost:8000/api/auth/forgot-password', { email });
      if (response.status === 200) {
        alert('A new password has been sent to your email.');
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signin-container">
      <img src={logo} alt="Profile Avatar" className="avatar" />
      <h2 className="sign-in-heading">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="icon">
            <FaUser />
          </div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <div className="icon">
            <FaLock />
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="checkbox-group">
          <input type="checkbox" id="save-password" />
          <label htmlFor="save-password">Remember me</label>
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
      <div className="extra-links">
        <Link to="/register" className="account-text">Don't have an account? <span className="inner-extra-links">Register Now!</span></Link>
        <a href="#" className="password-text" onClick={handleForgotPassword}>Forgot Password</a>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignInForm;
