import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom"

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employerId: "",
    idProof: "",
    firstName: "",
    lastName: "",
    gender: "",
    employeeType: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://guest-house-backend.vercel.app/api/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (response.status === 200) {
        alert('Registration successful! Check your email for login details.');
        navigate('/login')
        setFormData({
          employerId: "",
          idProof: "",
          firstName: "",
          lastName: "",
          gender: "",
          employeeType: "",
          phone: "",
          email: "",
        });
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register Now!</h2>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="employerId">
              Employer Id<span className="symbol"> *</span>
            </label>
            <input
              type="text"
              id="employerId"
              placeholder="e.g. 12345"
              required
              value={formData.employerId}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="idProof">
              ID Proof<span className="symbol"> *</span>
            </label>
            <input
              type="text"
              id="idProof"
              placeholder="e.g. Aadhar Card Number"
              required
              value={formData.idProof}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">
              First Name<span className="symbol"> *</span>
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="e.g. John"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">
              Last Name<span className="symbol"> *</span>
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="e.g. Smith"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gender">
              Gender<span className="symbol"> *</span>
            </label>
            <select
              id="gender"
              required
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="employeeType">
              Employee Type<span className="symbol"> *</span>
            </label>
            <select
              id="employeeType"
              required
              value={formData.employeeType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="technicalOfficer">Technical Officer</option>
              <option value="projectAssociate">Project Associate</option>
              <option value="jrf">JRF</option>
              <option value="srf">SRF</option>
              <option value="researchScholar">Research Scholar</option>
              <option value="pensioner">Pensioner</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">
              Phone No.<span className="symbol">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="+91 0000000000"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email<span className="symbol"> *</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="e.g. john@your-domain.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="terms full-width">
          <input
            type="checkbox"
            id="terms"
            required
          />
          <label htmlFor="terms">
            Creating an account means you're okay with our{" "}
            <a href="#">Terms and Conditions</a> and our{" "}
            <a href="#">Privacy Policy</a>.
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
