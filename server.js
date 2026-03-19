const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + file.originalname;
    cb(null, unique);
  }
});
const upload = multer({ storage });

// Simple in-memory storage
let messages = [];
const PASSWORD = "1234"; // Change your chat password

// Routes
app.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === PASSWORD) res.json({ success: true });
  else res.json({ success: false });
});

app.post('/upload-pfp', upload.single('pfp'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

app.post('/message', (req, res) => {
  const { user, text, pfp } = req.body;
  const msg = { user, text, pfp, timestamp: Date.now() };
  messages.push(msg);
  res.json({ success: true });
});

app.get('/messages', (req, res) => {
  res.json(messages);
});

// Start server
app.listen(PORT, () => {
  console.log(`Chat+ running at http://localhost:${PORT}`);
});
