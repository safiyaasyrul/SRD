require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Basic check to see if it's working
app.get('/', (req, res) => res.send('API is running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
