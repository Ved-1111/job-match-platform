const { z } = require('zod');

const sendOtpSchema = z.object({
  body: z.object({
    email: z.string().email('Please provide a valid email address').min(1, 'Email is required'),
  }),
});

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long'),
    email: z.string().email('Please provide a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['seeker', 'recruiter'], { errorMap: () => ({ message: 'Role must be seeker or recruiter' }) }),
    skills: z.array(z.string()).optional(),
    companyName: z.string().optional(),
    otp: z.string().length(6, 'OTP must be exactly 6 digits'),
  }).refine((data) => {
    if (data.role === 'recruiter' && (!data.companyName || data.companyName.trim() === '')) {
      return false;
    }
    return true;
  }, {
    message: "Company Name is required for recruiters",
    path: ["companyName"]
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Please provide a valid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

const googleAuthSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Token is required'),
    role: z.enum(['seeker', 'recruiter']).optional(),
    companyName: z.string().optional()
  })
});

module.exports = {
  sendOtpSchema,
  registerSchema,
  loginSchema,
  googleAuthSchema
};
