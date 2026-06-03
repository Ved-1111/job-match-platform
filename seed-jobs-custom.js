require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Job = require('./models/Job');

async function seedJobs() {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/job-match';
    await mongoose.connect(MONGO_URI);
    
    const emails = ['uttam.ndtlevel3@gmail.com', 'tamhanekarkrishiv111@gmail.com'];
    const recruiters = await User.find({ email: { $in: emails }, role: 'recruiter' });
    
    if (recruiters.length === 0) {
      console.log('No recruiters found with those emails. Are you sure they are registered as recruiters?');
      process.exit(1);
    }

    for (const recruiter of recruiters) {
      if (recruiter.email === 'uttam.ndtlevel3@gmail.com') {
        const jobs = [
          {
            recruiterId: recruiter._id,
            title: 'Senior Software Engineer',
            requiredSkills: ['React', 'Node.js', 'MongoDB', 'AWS'],
            salaryRange: '₹30-40 LPA',
            location: 'Remote',
            jobType: 'Full-time'
          },
          {
            recruiterId: recruiter._id,
            title: 'Frontend Developer',
            requiredSkills: ['Vue.js', 'Tailwind CSS', 'JavaScript'],
            salaryRange: '₹15-25 LPA',
            location: 'Bengaluru',
            jobType: 'Full-time'
          }
        ];
        await Job.insertMany(jobs);
        console.log(`Added jobs for ${recruiter.email}`);
      }
      
      if (recruiter.email === 'tamhanekarkrishiv111@gmail.com') {
        const jobs = [
          {
            recruiterId: recruiter._id,
            title: 'Data Scientist',
            requiredSkills: ['Python', 'Machine Learning', 'Pandas', 'TensorFlow'],
            salaryRange: '₹25-35 LPA',
            location: 'Mumbai',
            jobType: 'Full-time'
          },
          {
            recruiterId: recruiter._id,
            title: 'Cloud Architect',
            requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
            salaryRange: '₹40-60 LPA',
            location: 'Remote',
            jobType: 'Full-time'
          },
          {
            recruiterId: recruiter._id,
            title: 'Backend Developer',
            requiredSkills: ['Go', 'PostgreSQL', 'Microservices'],
            salaryRange: '₹20-30 LPA',
            location: 'Pune',
            jobType: 'Full-time'
          }
        ];
        await Job.insertMany(jobs);
        console.log(`Added jobs for ${recruiter.email}`);
      }
    }
    
    console.log('Successfully seeded jobs!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedJobs();
