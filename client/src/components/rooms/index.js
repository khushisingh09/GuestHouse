import React from 'react';
import RoomCard from '../room-cards';
import './index.css';

const App = () => {
  const rooms = [
    {
      image: '/images/room1.jpg', // Replace with actual image URLs
      title: 'Single',
      roomNumber: 'FF1',
      price: 500,
      description: 'Suitable place for you.',
      rating: 4
    },
    {
      image: '/images/room2.jpg', // Replace with actual image URLs
      title: 'Single',
      roomNumber: 'FF2',
      price: 500,
      description: 'Suitable place for you.',
      rating: 4
    },
    {
      image: '/images/room3.jpg', // Replace with actual image URLs
      title: 'Conference',
      roomNumber: 'C1',
      price: 1000,
      description: 'Perfect for meeting.',
      rating: 5
    },
    {
      image: '/images/room1.jpg', // Replace with actual image URLs
      title: 'Suite',
      roomNumber: 'S1',
      price: 1500,
      description: 'Suitable place for you.',
      rating: 5
    },
    {
      image: '/images/room1.jpg', // Replace with actual image URLs
      title: 'Single',
      roomNumber: 'FF1',
      price: 500,
      description: 'Suitable place for you.',
      rating: 4
    },
    {
      image: '/images/room2.jpg', // Replace with actual image URLs
      title: 'Single',
      roomNumber: 'FF2',
      price: 500,
      description: 'Suitable place for you.',
      rating: 4
    },
    {
      image: '/images/room3.jpg', // Replace with actual image URLs
      title: 'Conference',
      roomNumber: 'C1',
      price: 1000,
      description: 'Perfect for meeting.',
      rating: 5
    },
    {
      image: '/images/room1.jpg', // Replace with actual image URLs
      title: 'Suite',
      roomNumber: 'S1',
      price: 1500,
      description: 'Suitable place for you.',
      rating: 5
    }
  ];

  return (
    <div className="app">
      <h2>Continue to Book if you have registered</h2>
      <div className="room-cards-container">
        {rooms.map((room, index) => (
          <RoomCard key={index} {...room} />
        ))}
      </div>
    </div>
  );
};

export default App;
