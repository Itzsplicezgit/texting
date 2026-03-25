const express = require('express')
const fs = require('fs')
const multer = require('multer')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 10000

app.use(express.json())
app.use(express.static(__dirname))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads')

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

function read(file) {
  if (!fs.existsSync(file)) return []
  return JSON.parse(fs.readFileSync(file))
}

function write(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

app.post('/register', upload.single('pfp'), (req, res) => {
  const { username, password } = req.body
  let users = read('users.json')

  if (users.find(u => u.username === username)) {
    return res.status(400).send('user exists')
  }

  const user = {
    username,
    password,
    pfp: req.file ? '/uploads/' + req.file.filename : null
  }

  users.push(user)
  write('users.json', users)

  res.json(user)
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  const users = read('users.json')

  const user = users.find(u => u.username === username && u.password === password)
  if (!user) return res.status(401).send('invalid')

  res.json(user)
})

app.post('/message', upload.array('files'), (req, res) => {
  const { username, text } = req.body
  let messages = read('messages.json')
  const users = read('users.json')
  const user = users.find(u => u.username === username)

  const files = (req.files || []).map(f => '/uploads/' + f.filename)

  const msg = {
    username,
    text,
    files,
    pfp: user?.pfp || null,
    time: Date.now()
  }

  messages.push(msg)
  write('messages.json', messages)

  res.json(msg)
})

app.get('/messages', (req, res) => {
  res.json(read('messages.json'))
})

app.listen(PORT, () => console.log('running on ' + PORT))
