const cron = require('node-cron');
const { Job, User, Match, Notification } = require('../index');

// Normalize string for better matching (lowercase, remove spaces and punctuation)
const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

// Phase 3: Simple tag intersection score
function matchScore(seekerSkills, jobSkills) {
  if (!jobSkills || jobSkills.length === 0) return 0;
  
  // To handle case insensitivity and punctuation gracefully
  const seekerSkillsLower = (seekerSkills || []).map(normalize);
  const jobSkillsLower = jobSkills.map(normalize);

  const matched = seekerSkillsLower.filter(s => jobSkillsLower.includes(s));
  return (matched.length / jobSkillsLower.length) * 100;
}

const runMatching = async () => {
  console.log('Running background matching job...');
  try {
    const openJobs = await Job.find({ status: 'open' });
    const activeSeekers = await User.find({ role: 'seeker' });

    for (const job of openJobs) {
      for (const seeker of activeSeekers) {
        try {
          const score = matchScore(seeker.skills, job.requiredSkills);
          const existingMatch = await Match.findOne({ jobId: job._id, seekerId: seeker._id });

          if (existingMatch) {
            // If score dropped below threshold, remove the match
            if (score < 60) {
              await Match.deleteOne({ _id: existingMatch._id });
              console.log(`Match removed! Job ${job._id} - Seeker ${seeker._id} Score dropped to: ${score}%`);
            } 
            // If score changed but still >= 60, update the match score
            else if (existingMatch.matchScore !== score) {
              existingMatch.matchScore = score;
              await existingMatch.save();
              console.log(`Match updated! Job ${job._id} - Seeker ${seeker._id} New Score: ${score}%`);
            }
            continue; // Skip creating a new match since we handled the existing one
          }

          // If no existing match and score >= 60, create a new match and send notifications
          if (score >= 60) {
            const newMatch = new Match({
              jobId: job._id,
              seekerId: seeker._id,
              recruiterId: job.recruiterId,
              matchScore: score
            });
            await newMatch.save();
            console.log(`Match found! Job ${job._id} - Seeker ${seeker._id} Score: ${score}%`);
            
            // Create Notification for the Seeker
            await new Notification({
              userId: seeker._id,
              matchId: newMatch._id,
              message: `You have a match! Pay ₹199 to unlock contact details for the job: ${job.title}.`
            }).save();

            // Create Notification for the Recruiter
            await new Notification({
              userId: job.recruiterId,
              matchId: newMatch._id,
              message: `You have a match! Pay ₹199 to unlock contact details for a seeker who matches ${Math.round(score)}% with your job: ${job.title}.`
            }).save();
          }
        } catch (innerError) {
          if (innerError.code !== 11000) {
            console.error(`Error matching job ${job._id} and seeker ${seeker._id}:`, innerError);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error running match service:', error);
  }
};

// Cron job to run matching logic every 10 seconds
cron.schedule('*/10 * * * * *', runMatching);

module.exports = {
  runMatching,
  matchScore
};
