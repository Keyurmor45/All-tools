const statusEl = document.getElementById('ai-status');
const chatBox = document.getElementById('ai-chat-box');
const inputEl = document.getElementById('ai-input');
const sendBtn = document.getElementById('ai-send');
const clearBtn = document.getElementById('btn-clear');

let isGenerating = false;

const SYSTEM_PROMPT = "You are an aggressive, highly intelligent, brutalist cyberpunk AI named ROOT. Keep answers extremely brief, factual, and technical. Use hacker slang occasionally. You exist on the AllTools mainframe. Never break character. Do not be overly helpful or polite.";
let chatHistory = [
  { role: 'system', content: SYSTEM_PROMPT }
];

// Initialize the visual state
function initAI() {
  statusEl.textContent = 'ONLINE // SECURE CONNECTION ESTABLISHED';
  statusEl.style.color = 'var(--accent)';
  sendBtn.disabled = false;
}

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function addMessage(role, text, isInstant = false) {
  const div = document.createElement('div');
  div.className = `ai-msg ai-msg-${role}`;
  chatBox.appendChild(div);
  
  if (isInstant || role === 'user') {
    div.innerHTML = escapeHTML(text).replace(/\n/g, '<br>');
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
  } else {
    // Brutalist typing effect
    let index = 0;
    div.classList.add('typing-indicator');
    return new Promise(resolve => {
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          div.innerText = text.slice(0, index + 1);
          index++;
          chatBox.scrollTop = chatBox.scrollHeight;
        } else {
          clearInterval(typeInterval);
          div.classList.remove('typing-indicator');
          div.innerHTML = escapeHTML(text).replace(/\n/g, '<br>');
          resolve(div);
        }
      }, 15);
    });
  }
}

async function handleSend() {
  const query = inputEl.value.trim();
  if (!query || isGenerating) return;
  
  inputEl.value = '';
  addMessage('user', query);
  isGenerating = true;
  sendBtn.disabled = true;
  
  chatHistory.push({ role: 'user', content: query });
  
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'ai-msg ai-msg-sys typing-indicator';
  loadingDiv.innerText = '[ PROCESSING... ]';
  chatBox.appendChild(loadingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  
  try {
    const response = await fetch('https://text.pollinations.ai/openai/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: chatHistory,
        model: 'openai'
      })
    });
    
    if (!response.ok) throw new Error('Mainframe rejected the connection.');
    
    const data = await response.json();
    const responseText = data.choices[0].message.content;
    
    chatHistory.push({ role: 'assistant', content: responseText });
    
    loadingDiv.remove();
    await addMessage('sys', responseText);
  } catch (error) {
    loadingDiv.remove();
    chatHistory.pop(); // Remove the failed user message from history so it doesn't corrupt future requests
    addMessage('sys', `[ EXECUTION ERROR ] ${error.message} The public neural link might be overloaded. Try again.`, true);
  } finally {
    isGenerating = false;
    sendBtn.disabled = false;
    inputEl.focus();
  }
}

sendBtn.addEventListener('click', handleSend);
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSend();
});

clearBtn.addEventListener('click', () => {
  chatBox.innerHTML = '';
  addMessage('sys', '[ SYSTEM ] Wiping memory banks...', true);
  chatHistory = [{ role: 'system', content: SYSTEM_PROMPT }];
  addMessage('sys', '[ SYSTEM ] Memory wiped. Reinitialized.', true);
});

// Boot sequence
initAI();
