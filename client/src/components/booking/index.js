import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { useSelector, useDispatch } from "react-redux";

const BookingForm = () => {
    const location = useLocation();
    const { price } = location.state || {};
    const { user } = useSelector((state) => state.authSlice);
    console.log("inside navbar user", user.employerId
    );

    const [formData, setFormData] = useState({
        cid: user.employerId || '',
        comingFrom: '',
        goingTo: '',
        checkInDate: '',
        checkOutDate: '',
        noOfPeople: '',
        durationOfStay: '',
        bookingFor: '',
        totalAmount: price || '',
        transactionNo: '',
        termsAccepted: false,
        screenshot: null
    });

    useEffect(() => {
        if (price) {
            setFormData(prevState => ({
                ...prevState,
                totalAmount: price
            }));
        }
    }, [price]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const token = localStorage.getItem('token');
            console.log("hello token ", token);

            const response = await axios.post('https://guesthouse-backend-xbty.onrender.com/api/bookings/create', formData, {
                headers: {
                    'token': token,
                },
            });

            if (response.status === 201) {
                toast.success('Booking successful!');
                // Clear the form
                handleReset();
            } else {
                toast.error('Booking error. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form', error);
            toast.error('Error submitting form. Please try again.');
        }
    };

    const handleReset = () => {
        setFormData({
            // cid: '',
            comingFrom: '',
            goingTo: '',
            checkInDate: '',
            checkOutDate: '',
            noOfPeople: '',
            durationOfStay: '',
            bookingFor: '',
            totalAmount: '',
            transactionNo: '',
            termsAccepted: false,
            screenshot: null
        });
    };
    return (
        <div>
            <form className="booking-form" onSubmit={handleSubmit}>
                <h2>Proceed Booking</h2>
                <div className="form-section">
                    <div className="form-column">
                        <div className='inner-form'>
                            <label>CID</label>
                            <input type="text" name="cid" value={formData.cid} onChange={handleChange} disabled />
                        </div>
                        <div className='inner-form'>
                            <label>Coming From</label>
                            <input type="text" name="comingFrom" value={formData.comingFrom} onChange={handleChange} />
                        </div>
                        <div className='inner-form'>
                            <label>Going to</label>
                            <input type="text" name="goingTo" value={formData.goingTo} onChange={handleChange} />
                        </div>
                        <div className='inner-form'>
                            <label>Check-in Date</label>
                            <input type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-column">
                        <div className='inner-form'>
                            <label>Check-out Date</label>
                            <input type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} />
                        </div>
                        <div className='inner-form'>
                            <label>No of People</label>
                            <select name="noOfPeople" value={formData.noOfPeople} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        <div className='inner-form'>
                            <label>Duration of Stay</label>
                            <select name="durationOfStay" value={formData.durationOfStay} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="1">1 Day</option>
                                <option value="2">2 Days</option>
                                <option value="3">3 Days</option>
                                <option value="4">4 Days</option>
                                <option value="5">5 Days</option>
                                <option value="6">6 Days</option>
                                <option value="7">7 Days</option>
                                <option value="8">8 Days</option>
                                <option value="9">9 Days</option>
                                <option value="10">10 Days</option>
                            </select>
                        </div>
                        <div className='inner-form'>
                            <label>Booking for</label>
                            <select name="bookingFor" value={formData.bookingFor} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="Personal">Personal</option>
                                <option value="Business">Official</option>
                            </select>
                        </div>
                    </div>
                </div>
                <h2>Payment Gateway</h2>
                <div className="payment-section">
                    <div className="payment-column">
                        <div className='inner-form'>
                            <label>Total Amount of Customer</label>
                            <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} disabled />
                        </div>
                        <div className='inner-form'>
                            <label>Transaction No.</label>
                            <input type="text" name="transactionNo" value={formData.transactionNo} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="payment-column">
                        <div className='inner-form'>
                            <label>Screenshot</label>
                            <input type="file" name="screenshot" onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="terms">
                    <label>
                        <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
                        I agree with the terms & conditions
                    </label>
                </div>
                <div className="buttons">
                    <button type="submit"><i className="fas fa-check"></i> Confirm</button>
                    <button type="button" onClick={handleReset}><i className="fas fa-redo"></i> Reset</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};
export default BookingForm;
