require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function seedSeekers() {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/job-match';
    await mongoose.connect(MONGO_URI);

    const candidates = [
      {
        name: 'Alice Johnson (Full Stack)',
        email: 'alice.candidate@example.com',
        role: 'seeker',
        skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript', 'GraphQL'],
        experienceLevel: 'Senior'
      },
      {
        name: 'Bob Smith (Frontend)',
        email: 'bob.candidate@example.com',
        role: 'seeker',
        skills: ['Vue.js', 'Tailwind CSS', 'JavaScript', 'HTML', 'CSS'],
        experienceLevel: 'Mid'
      },
      {
        name: 'Charlie Davis (Data Science)',
        email: 'charlie.data@example.com',
        role: 'seeker',
        skills: ['Python', 'Machine Learning', 'Pandas', 'TensorFlow', 'Scikit-Learn', 'SQL'],
        experienceLevel: 'Senior'
      },
      {
        name: 'Diana Prince (DevOps)',
        email: 'diana.cloud@example.com',
        role: 'seeker',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Linux', 'Ansible'],
        experienceLevel: 'Senior'
      },
      {
        name: 'Evan Wright (Backend)',
        email: 'evan.backend@example.com',
        role: 'seeker',
        skills: ['Go', 'PostgreSQL', 'Microservices', 'Docker', 'gRPC'],
        experienceLevel: 'Mid'
      }
    ];

    for (const candidate of candidates) {
      const exists = await User.findOne({ email: candidate.email });
      if (!exists) {
        await User.create(candidate);
        console.log(`Created candidate: ${candidate.name}`);
      } else {
        console.log(`Candidate ${candidate.name} already exists. Updating skills...`);
        await User.updateOne({ email: candidate.email }, { $set: { skills: candidate.skills }});
      }
    }

    console.log('Successfully seeded candidates!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedSeekers();
