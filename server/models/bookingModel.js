const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    cid: {
        type: String,
        required: true,
    },
    comingFrom: {
        type: String,
        required: true,
    },
    goingTo: {
        type: String,
        required: true,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    noOfPeople: {
        type: Number,
        required: true,
    },
    durationOfStay: {
        type: Number,
        required: true,
    },
    bookingFor: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    transactionNo: {
        type: String,
        required: true,
    },
    screenshot: {
        type: String,
    },
    termsAccepted: {
        type: Boolean,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
