const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let participants = {}; // Store participant data

// Admin Route: Generate passwords and pairs
app.post('/generate', (req, res) => {
  const names = req.body.names;

  if (!names || names.length < 2) {
    return res.status(400).json({ error: 'At least two names are required.' });
  }

  let shuffledNames;
  do {
    shuffledNames = [...names].sort(() => Math.random() - 0.5);
  } while (shuffledNames.some((name, i) => name === names[i]));

  participants = names.reduce((acc, name, index) => {
    const password = Math.random().toString(36).slice(-8);
    acc[name] = { password, assigned: shuffledNames[index] };
    return acc;
  }, {});

  res.json(participants);
});

// Public Route: Participant login
app.post('/login', (req, res) => {
  const { name, password } = req.body;

  if (participants[name] && participants[name].password === password) {
    res.json({ assigned: participants[name].assigned });
  } else {
    res.status(400).json({ error: 'Invalid name or password.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
