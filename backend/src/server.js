require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sendNotice } = require('./services/emailService');

const app = express();

// This allows your website to talk to the server
app.use(cors({ origin: '*' }));
app.use(express.json());

// 1. THIS IS THE TEST LINK
// When you visit /api/send-notice in your browser, you should see "I am ready!"
app.get('/api/send-notice', (req, res) => {
  res.send('✅ The Brain is ready! It is waiting for the website button to send a POST request.');
});

// 2. THE BUTTON LINK
app.post('/api/send-notice', async (req, res) => {
  try {
    const { email, name, status } = req.body;
    console.log("Button clicked for:", email);
    
    const result = await sendNotice(email, name, status);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Home link
app.get('/', (req, res) => res.send('Server is Online and Live!'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
