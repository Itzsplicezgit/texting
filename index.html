<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Chat+ Minimal B&W</title>
<style>
  * { box-sizing:border-box; }
  body, html { margin:0; padding:0; height:100%; width:100%; background:#000; color:#fff; font-family:'Segoe UI',sans-serif; display:flex; flex-direction:column; }
  #chatPage { display:flex; flex-direction:column; height:100%; width:100%; }

  /* Header */
  #header { display:flex; align-items:center; padding:10px 20px; border-bottom:1px solid #333; gap:15px; }
  #username { background:transparent; border:none; color:#fff; font-size:18px; padding:5px 8px; width:200px; outline:none; }
  #pfpPreview { width:40px; height:40px; border-radius:50%; object-fit:cover; cursor:pointer; border:1px solid #555; }
  #pfpInput { display:none; }

  /* Chat container */
  #chatBox { flex-grow:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:15px; background:#000; scroll-behavior:smooth; }

  .message { display:flex; gap:10px; align-items:flex-start; max-width:800px; word-break:break-word; }
  .message img.avatar { width:40px; height:40px; border-radius:50%; object-fit:cover; flex-shrink:0; }
  .message-content { background:#111; border-radius:12px; padding:12px 16px; color:#ddd; font-size:16px; position:relative; }
  .message-content img.chat-image { margin-top:8px; max-width:320px; border-radius:10px; display:block; }
  .timestamp { font-size:11px; color:#555; margin-top:6px; text-align:right; font-family:monospace; }
  .deleteBtn { position:absolute; top:4px; right:4px; cursor:pointer; width:18px; height:18px; }

  /* Input */
  #inputArea { display:flex; padding:15px 20px; border-top:1px solid #222; background:#111; gap:10px; align-items:center; }
  #messageInput { flex-grow:1; background:#000; border:none; border-radius:0; padding:14px 16px; color:#eee; font-size:16px; outline:none; }
  #sendBtn, #imageBtn { background:transparent; border:none; color:#fff; font-size:22px; cursor:pointer; padding:8px 10px; }
  #sendBtn:hover, #imageBtn:hover { background-color: rgba(255,255,255,0.1); }
  #imageInput { display:none; }
</style>
</head>
<body>

<div id="chatPage">
  <div id="header">
    <input id="username" type="text" placeholder="Your name..." autocomplete="off" spellcheck="false" />
    <img id="pfpPreview" src="pfp.png" alt="Profile Picture" title="Click to change profile picture" />
    <input type="file" id="pfpInput" accept="image/*" />
  </div>

  <div id="chatBox"></div>

  <div id="inputArea">
    <input id="messageInput" type="text" placeholder="Type a message..." autocomplete="off" spellcheck="false" />
    <input type="file" id="imageInput" accept="image/*" />
    <button id="imageBtn" title="Attach image">📎</button>
    <button id="sendBtn" title="Send message">➤</button>
  </div>
</div>

<script>
const chatBox = document.getElementById('chatBox');
const usernameInput = document.getElementById('username');
const pfpPreview = document.getElementById('pfpPreview');
const pfpInput = document.getElementById('pfpInput');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const imageBtn = document.getElementById('imageBtn');
const imageInput = document.getElementById('imageInput');

const defaultPfp = 'pfp.png';
let selectedImageFile = null;
let messages = []; // In-memory messages (you can move to DB later)

// Load PFP from localStorage
pfpPreview.src = localStorage.getItem('chatplusPfp') || defaultPfp;

// PFP upload
pfpPreview.onclick = ()=> pfpInput.click();
pfpInput.onchange = async ()=>{
  const file = pfpInput.files[0];
  if(!file) return;
  const form = new FormData();
  form.append('image', file);
  const res = await fetch('/upload', { method:'POST', body: form });
  const data = await res.json();
  if(data.url){ pfpPreview.src = data.url; localStorage.setItem('chatplusPfp', data.url); }
};

// Chat image attach
imageBtn.onclick = ()=> imageInput.click();
imageInput.onchange = ()=> selectedImageFile = imageInput.files[0];

// Replace emoji codes with PNGs
function replaceEmojis(text){
  return text.replace(/:([a-z0-9_]+):/gi,(m,name)=>`<img src="${name}.png" alt="${name}" style="width:20px;vertical-align:middle;">`);
}

// Render messages
function renderMessages(){
  chatBox.innerHTML = '';
  messages.forEach((msg,index)=>{
    const div = document.createElement('div');
    div.className='message';

    const avatar = document.createElement('img');
    avatar.className='avatar';
    avatar.src = msg.pfp || defaultPfp;
    div.appendChild(avatar);

    const content = document.createElement('div');
    content.className='message-content';

    if(msg.text) content.innerHTML = replaceEmojis(msg.text);
    if(msg.image){ const img = document.createElement('img'); img.src=msg.image; img.className='chat-image'; content.appendChild(img); }

    const timestamp = document.createElement('div');
    timestamp.className='timestamp';
    timestamp.textContent = new Date(msg.timestamp).toLocaleString();
    content.appendChild(timestamp);

    if(msg.user === usernameInput.value){
      const del = document.createElement('img');
      del.src='trash.png';
      del.className='deleteBtn';
      del.title='Delete message';
      del.onclick = ()=> { messages.splice(index,1); renderMessages(); };
      content.appendChild(del);
    }

    div.appendChild(content);
    chatBox.appendChild(div);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message
async function sendMessage(){
  const text = messageInput.value.trim();
  const user = usernameInput.value || 'Guest';
  const pfp = pfpPreview.src || defaultPfp;
  if(!text && !selectedImageFile) return;

  if(selectedImageFile){
    const form = new FormData();
    form.append('image', selectedImageFile);
    const res = await fetch('/upload', { method:'POST', body: form });
    const data = await res.json();
    addMessage(text,user,pfp,data.url);
  } else addMessage(text,user,pfp,null);
}

function addMessage(text,user,pfp,image){
  messages.push({text,user,pfp,image,timestamp:Date.now()});
  messageInput.value=''; selectedImageFile=null; imageInput.value=null;
  renderMessages();
}

sendBtn.onclick = sendMessage;
messageInput.addEventListener('keypress', e=>{ if(e.key==='Enter') sendMessage(); });

renderMessages();
</script>
</body>
</html>
