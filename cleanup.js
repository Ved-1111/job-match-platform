const mongoose = require('mongoose');
const Match = require('./models/Match');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/job-match';

mongoose.connect(MONGO_URI).then(async () => {
  try {
    console.log('Connected to MongoDB for cleanup...');
    const matches = await Match.find({});
    const seen = new Set();
    const toDelete = [];
    
    for (const m of matches) {
      const key = m.jobId.toString() + '_' + m.seekerId.toString();
      if (seen.has(key)) {
        toDelete.push(m._id);
      } else {
        seen.add(key);
      }
    }
    
    if (toDelete.length > 0) {
      await Match.deleteMany({ _id: { $in: toDelete } });
      console.log('Deleted ' + toDelete.length + ' duplicate matches.');
      try {
        await Match.collection.createIndex({ jobId: 1, seekerId: 1 }, { unique: true });
        console.log('Created unique index.');
      } catch(e) {
        console.log('Index error (might already exist):', e.message);
      }
    } else {
      console.log('No duplicates found.');
      try {
        await Match.collection.createIndex({ jobId: 1, seekerId: 1 }, { unique: true });
        console.log('Created unique index.');
      } catch(e) {
        console.log('Index error (might already exist):', e.message);
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
});
