const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json({ limit: '50mb' })); // increase payload limit for base64 uploads
app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

function read(file) {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file));
}

function write(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function saveBase64File(base64String, filename) {
  const matches = base64String.match(/^data:(.+);base64,(.+)$/);
  if (!matches) return null;

  const buffer = Buffer.from(matches[2], 'base64');
  const filePath = path.join('uploads', filename);
  fs.writeFileSync(filePath, buffer);
  return '/uploads/' + filename;
}

// Register route with optional base64 profile picture
app.post('/register', (req, res) => {
  const { username, password, pfpBase64 } = req.body;
  let users = read('users.json');

  if (users.find(u => u.username === username)) {
    return res.status(400).send('user exists');
  }

  const user = {
    username,
    password,
    pfp: pfpBase64 ? saveBase64File(pfpBase64, Date.now() + '-pfp.png') : null
  };

  users.push(user);
  write('users.json', users);

  res.json(user);
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = read('users.json');

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).send('invalid');

  res.json(user);
});

// Message route with optional base64 files
app.post('/message', (req, res) => {
  const { username, text, filesBase64 } = req.body;
  let messages = read('messages.json');
  const users = read('users.json');
  const user = users.find(u => u.username === username);

  const files = (filesBase64 || []).map((fileBase64, idx) =>
    saveBase64File(fileBase64, Date.now() + '-' + idx + '.bin')
  );

  const msg = {
    username,
    text,
    files,
    pfp: user?.pfp || null,
    time: Date.now()
  };

  messages.push(msg);
  write('messages.json', messages);

  res.json(msg);
});

// Get messages
app.get('/messages', (req, res) => {
  res.json(read('messages.json'));
});

app.listen(PORT, () => console.log('running on ' + PORT));
