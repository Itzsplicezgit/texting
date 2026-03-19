const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Ensure uploads folder exists
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Site password middleware
const SITE_PASSWORD = process.env.SITE_PASSWORD || 'chatplus123';
app.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === SITE_PASSWORD) res.json({ success: true });
  else res.json({ success: false });
});

// Image upload endpoint (for PFP or chat images)
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});

// Start server
app.listen(PORT, () => console.log(`Chat+ running on port ${PORT}`));
