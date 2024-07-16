const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');

// Get booking details by CID
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
console.log("CID", cid);

    try {
        const bookings = await Booking.find({ cid });
console.log("bookings", bookings);
        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found for this CID' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;