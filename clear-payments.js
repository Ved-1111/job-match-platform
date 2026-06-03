require('dotenv').config();
const mongoose = require('mongoose');
const Match = require('./models/Match');
const Payment = require('./models/Payment');

async function clearPayments() {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/job-match';
    await mongoose.connect(MONGO_URI);

    // 1. Reset all matches to pending
    const updateResult = await Match.updateMany(
      {},
      { 
        $set: { 
          'paymentStatus.seeker': 'pending',
          'paymentStatus.recruiter': 'pending'
        } 
      }
    );
    
    // 2. Clear out the Payment collection
    const deleteResult = await Payment.deleteMany({});

    console.log(`Successfully reset ${updateResult.modifiedCount} matches to 'pending' status.`);
    console.log(`Deleted ${deleteResult.deletedCount} payment records from the database.`);
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

clearPayments();
