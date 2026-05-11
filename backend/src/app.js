const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(cors({
  origin: 'https://srd-git-main-wannurdiyana-5641s-projects.vercel.app/' 
}));
app.use(express.json());

// This is a test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is working!' });
});

module.exports = app;
