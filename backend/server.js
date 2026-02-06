const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Simple mock login route
app.post('/login', (req, res) => {
  const { email, password, userType } = req.body || {};
  console.log('POST /login body:', req.body);
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password' });
  }

  // Mock validation: accept password 'password123'
  if (password === 'password123') {
    return res.json({ message: `Logged in as ${String(userType || 'user').toUpperCase()}` });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Mock API running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Mock API listening on http://localhost:${PORT}`));
