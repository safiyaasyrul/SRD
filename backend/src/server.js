require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { sendNotice } = require('./services/emailService'); // This links the mailman

const app = express();

// Security and Settings
app.use(helmet());
app.use(cors());
app.use(express.json());

// 1. Basic check to see if it's working
app.get('/', (req, res) => res.send('API is running!'));

// 2. The Email "Notice" Instruction
app.post('/api/send-notice', async (req, res) => {
  const { email, name, status } = req.body;
  console.log("Attempting to send email to:", email);
  
  const result = await sendNotice(email, name, status);
  
  if (result.success) {
    res.json({ success: true, message: 'Email sent!' });
  } else {
    res.status(500).json({ success: false, message: 'Email failed to send' });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server is live on port ${PORT}`));
