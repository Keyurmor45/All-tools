const firebaseConfig = {
  apiKey: "AIzaSyDBmUhx6Uy-78cHl2ckPXIlpKQvSGJZEqE",
  authDomain: "alltool-b60c7.firebaseapp.com",
  databaseURL: "https://alltool-b60c7-default-rtdb.firebaseio.com",
  projectId: "alltool-b60c7",
  storageBucket: "alltool-b60c7.firebasestorage.app",
  messagingSenderId: "717933150132",
  appId: "1:717933150132:web:f331da69d07d3bf4b13ce1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const chatRef = db.ref('bbs_messages');

const chatBox = document.getElementById('bbs-chat-box');
const inputEl = document.getElementById('bbs-input');
const sendBtn = document.getElementById('bbs-send');
const usersEl = document.getElementById('active-users');

let myAlias = localStorage.getItem('bbs_alias');
if (!myAlias) {
  myAlias = 'GUEST_' + Math.floor(Math.random() * 9999);
  localStorage.setItem('bbs_alias', myAlias);
}

function getTimeStr(timestamp) {
  const now = timestamp ? new Date(timestamp) : new Date();
  return `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
}

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function addMessageToUI(user, text, timestamp, isSys = false) {
  const isSelf = user === myAlias;
  const div = document.createElement('div');
  div.className = 'bbs-msg';
  
  if (isSys) {
    div.classList.add('bbs-sys-msg');
    div.innerHTML = `<span class="bbs-msg-time">${getTimeStr(timestamp)}</span><span class="bbs-msg-content">${escapeHTML(text)}</span>`;
  } else {
    div.innerHTML = `
      <span class="bbs-msg-time">${getTimeStr(timestamp)}</span>
      <span class="bbs-msg-user ${isSelf ? 'self' : ''}"><${escapeHTML(user)}></span>
      <span class="bbs-msg-content">${escapeHTML(text)}</span>
    `;
  }
  
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  
  // Keep only last 100 messages in DOM
  if (chatBox.children.length > 100) {
    chatBox.removeChild(chatBox.children[0]);
  }
}

// Listen for new messages from Firebase
chatRef.orderByChild('timestamp').limitToLast(50).on('child_added', (snapshot) => {
  const data = snapshot.val();
  addMessageToUI(data.user, data.text, data.timestamp);
});

// Handle sending messages to Firebase
function handleSend() {
  const text = inputEl.value.trim();
  if (!text) return;
  
  inputEl.value = '';
  
  chatRef.push({
    user: myAlias,
    text: text,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  }).catch((error) => {
    addMessageToUI('SYS', `ERROR: Could not transmit. Check your database rules.`, null, true);
    console.error("Firebase write error:", error);
  });
}

sendBtn.addEventListener('click', handleSend);
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSend();
});

// Initial Greeting & Setup
setTimeout(() => {
  addMessageToUI('SYS', `Authenticated as ${myAlias}`, null, true);
  addMessageToUI('SYS', `Connection securely routed to Firebase.`, null, true);
}, 500);

// Randomize active users counter slightly for aesthetic
setInterval(() => {
  let currentUsers = parseInt(usersEl.innerText);
  currentUsers += (Math.random() > 0.5 ? 1 : -1);
  if (currentUsers < 1) currentUsers = 1;
  usersEl.innerText = currentUsers;
}, 10000);

inputEl.focus();
