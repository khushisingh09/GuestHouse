import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
const BookingTable = () => {
    const [cid, setCid] = useState('');
    const [bookings, setBookings] = useState([]);
    const handleCidChange = (e) => {
        setCid(e.target.value);
    };
    const handleCheck = async () => {
        try {
            const response = await axios.get(`https://guest-house-backend.vercel.app/api/bookings/${cid}`);
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setBookings([]); // Clear bookings if there's an error
        }
    };
    const handleDelete = (cid) => {
        console.log('Delete booking with CID:', cid);
    };
    console.log("bookings", bookings);
    return (
        <div className="booking-table-container">
            <h2>Edit / Cancel Your Booking</h2>
            <div className="booking-check">
                <input type="text" placeholder="Enter CID" value={cid} onChange={handleCidChange} />
                <button onClick={handleCheck}>Check</button>
            </div>
            <table className="booking-table">
                <thead>
                    <tr>
                        <th>CID</th>
                        {/* <th>Room ID</th> */}
                        <th>Check-In Date</th>
                        <th>Check-Out Date</th>
                        <th>No. of People</th>
                        <th>Coming From</th>
                        <th>Going To </th>
                        <th>Duration of Stay</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.cid}</td>
                            {/* <td>{booking.roomId}</td> */}
                            <td>{new Date(booking.checkInDate
                            ).toLocaleDateString()}</td>
                            <td>{new Date(booking.checkOutDate
                            ).toLocaleDateString()}</td>
                            <td>{booking.noOfPeople}</td>
                            <td>{booking.comingFrom}</td>
                            <td>{booking.goingTo}</td>
                            <td>{booking.durationOfStay}</td>
                            {/* <td>{booking.status}</td> */}
                            {/* <td>
                                <button className="delete-button" onClick={() => handleDelete(booking.cid)}>
                                    <i className="fas fa-trash"></i> Cancel
                                </button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <div className="edit-details-container">
                <button className="edit-details-button">
                    <i className="fas fa-edit"></i> Edit your details
                </button>
            </div> */}
        </div>
    );
};
export default BookingTable;