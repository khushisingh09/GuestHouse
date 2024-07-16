import React from 'react';
import './index.css';
import { useNavigate } from "react-router-dom";

const RoomCard = ({ image, title, roomNumber, price, description, rating }) => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate('/bookings', { state: { price } });
  };

  return (
    <div className="room-card">
      <div className="room-card-image" style={{ backgroundImage: `url(${image})` }}>
        {/* Image section */}
      </div>
      <div className="room-card-details">
        <h3>{title}</h3>
        <p>Room No: {roomNumber}</p>
        <p>Price: INR {price}</p>
        <p>{description}</p>
        <div className="room-card-rating">
          {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
        </div>
        <button className="book-button" onClick={handleBook}>Book</button>
      </div>
    </div>
  );
};

export default RoomCard;
