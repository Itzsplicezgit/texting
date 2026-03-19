const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(__dirname));

const PASSWORD = "secret123";
const MESSAGE_FILE = path.join(__dirname, "messages.json");
const UPLOAD_DIR = path.join(__dirname, "uploads");

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random()*1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Load messages from JSON
let messages = [];
if (fs.existsSync(MESSAGE_FILE)) {
  try { messages = JSON.parse(fs.readFileSync(MESSAGE_FILE)); }
  catch(err){ messages = []; }
}

// Save messages
function saveMessages() {
  fs.writeFileSync(MESSAGE_FILE, JSON.stringify(messages.slice(-500))); // keep last 500
}

// Login
app.post('/login', (req,res)=>{
  const { password } = req.body;
  res.json({ success: password === PASSWORD });
});

// Send text message
app.post('/message', (req,res)=>{
  const { user, text, pfp } = req.body;
  if(!user || (!text && !req.body.image)) return res.status(400).json({error:'Invalid'});
  const message = {
    user,
    text: text || null,
    image: req.body.image || null, // optional base64 image
    timestamp: new Date().toISOString(),
    pfp: pfp || null
  };
  messages.push(message);
  saveMessages();
  res.json({ success:true });
});

// Upload profile pic
app.post('/upload-pfp', upload.single('pfp'), (req,res)=>{
  if(!req.file) return res.status(400).json({error:'No file'});
  res.json({ url: '/uploads/' + req.file.filename });
});

// Get all messages
app.get('/messages', (req,res)=>{
  res.json(messages);
});

app.listen(PORT, ()=>console.log(`Chat+ running on port ${PORT}`));
