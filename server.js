const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

const PASSWORD = "onlyfans"; // change this
let messages = []; // keeps last 50 messages

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Check password
app.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === PASSWORD) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Send message
app.post('/message', (req, res) => {
  const { user, text } = req.body;
  if (!text || !user) return res.status(400).json({ error: "Invalid" });
  messages.push({ user, text });
  if (messages.length > 50) messages.shift();
  res.json({ success: true });
});

// Get last messages
app.get('/messages', (req, res) => {
  res.json(messages);
});

app.listen(PORT, () => console.log(`Chat+ running on port ${PORT}`));
