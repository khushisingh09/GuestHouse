// EditForm.js
import React, { useState } from 'react';
import './index.css';

function EditForm() {
  const [formData, setFormData] = useState({
    employerId: '12345',
    idProof: 'Aadhar Card Number',
    firstName: 'John',
    lastName: 'Smith',
    gender: 'Select',
    phoneNumber: '+91 0000000000',
    employeeType: 'Select',
    email: 'john@your-domain.com',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle form submission or save action here
    console.log('Form data saved:', formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data or handle cancel action here
  };

  return (
    <div className="form-container">
      <h2>Edit your details!</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="employerId">Employer Id</label>
          <input
            type="text"
            id="employerId"
            name="employerId"
            value={formData.employerId}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label htmlFor="idProof">ID Proof</label>
          <input
            type="text"
            id="idProof"
            name="idProof"
            value={formData.idProof}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="Select">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone No.</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label htmlFor="employeeType">Employee Type</label>
          <select
            id="employeeType"
            name="employeeType"
            value={formData.employeeType}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="Select">Select</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-actions">
          {isEditing ? (
            <>
              <button type="submit" className="save-button">Save</button>
              <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button type="button" className="edit-button" onClick={toggleEdit}>Edit</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EditForm;
