const Booking = require('../models/bookingModel');
const path = require('path');
const fs = require('fs');

exports.createBooking = async (req, res) => {
    const {
        cid,
        comingFrom,
        goingTo,
        checkInDate,
        checkOutDate,
        noOfPeople,
        durationOfStay,
        bookingFor,
        totalAmount,
        transactionNo,
        termsAccepted,
    } = req.body;

    console.log("cid", req.body);

    // const screenshot = req.file;

    // if (!screenshot) {
    //     return res.status(400).json({ message: 'Screenshot is required' });
    // }

    try {
        const newBooking = new Booking({
            cid,
            comingFrom,
            goingTo,
            checkInDate,
            checkOutDate,
            noOfPeople,
            durationOfStay,
            bookingFor,
            totalAmount,
            transactionNo,
            termsAccepted,
            // screenshot: screenshot.path,
            user: req.user.id
        });

       const response = await newBooking.save();
       console.log("response", response);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
