const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_PROD],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

// Contact Form Endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  // TODO: Send email via nodemailer
  // TODO: Save to database
  
  res.json({ 
    success: true, 
    message: 'Contact form received. We will respond shortly.'
  });
});

// Privacy Policy Endpoint
app.get('/api/policies/privacy', (req, res) => {
  const lang = req.query.lang || 'ar';
  res.json({
    title: lang === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية',
    content: 'Full privacy policy content here...'
  });
});

// Learning Progress Endpoint
app.post('/api/progress', (req, res) => {
  const { userId, letterIndex, progress } = req.body;
  
  // TODO: Save progress to database
  
  res.json({ 
    success: true, 
    message: 'Progress saved',
    data: { userId, letterIndex, progress }
  });
});

// Get Learning Statistics
app.get('/api/stats/:userId', (req, res) => {
  const { userId } = req.params;
  
  // TODO: Fetch stats from database
  
  res.json({
    userId,
    lettersLearned: 0,
    totalScore: 0,
    gamesCompleted: 0
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
