const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  payerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  orderId: {
    type: String,
    required: true, // Razorpay/Stripe order ID
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
