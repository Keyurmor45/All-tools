/* ==========================================================================
   Y2K SNAKE GAME
   ========================================================================== */
const canvas = document.getElementById('snake-board');
const ctx = canvas.getContext('2d');
const gridSize = 20;
let snake = [];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snake-high') || 0;
let gameLoop;
let isPlaying = false;

document.getElementById('snake-high').innerText = highScore;

function initSnake() {
  snake = [
    {x: 200, y: 200},
    {x: 180, y: 200},
    {x: 160, y: 200}
  ];
  dx = gridSize;
  dy = 0;
  score = 0;
  document.getElementById('snake-score').innerText = score;
  spawnFood();
}

function spawnFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
  };
}

function drawSnake() {
  ctx.fillStyle = '#0a0a0a'; // Background
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = '#ff00ff'; // Hot Pink food
  ctx.fillRect(food.x, food.y, gridSize, gridSize);

  // Draw snake
  snake.forEach((part, index) => {
    ctx.fillStyle = index === 0 ? '#ccff00' : '#88aa00'; // Acid Green head, darker body
    ctx.fillRect(part.x, part.y, gridSize - 1, gridSize - 1);
  });
}

function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  
  // Wall collision
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    return gameOver();
  }
  
  // Self collision
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) return gameOver();
  }

  snake.unshift(head);

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById('snake-score').innerText = score;
    spawnFood();
  } else {
    snake.pop();
  }
}

function gameOver() {
  clearInterval(gameLoop);
  isPlaying = false;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('snake-high', highScore);
    document.getElementById('snake-high').innerText = highScore;
  }
  ctx.fillStyle = 'rgba(0,0,0,0.8)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ccff00';
  ctx.font = '24px "Syncopate", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2);
}

document.addEventListener('keydown', e => {
  if (!isPlaying) return;
  if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -gridSize; e.preventDefault(); }
  if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = gridSize; e.preventDefault(); }
  if (e.key === 'ArrowLeft' && dx === 0) { dx = -gridSize; dy = 0; e.preventDefault(); }
  if (e.key === 'ArrowRight' && dx === 0) { dx = gridSize; dy = 0; e.preventDefault(); }
});

document.getElementById('start-snake').addEventListener('click', () => {
  if (isPlaying) clearInterval(gameLoop);
  initSnake();
  isPlaying = true;
  gameLoop = setInterval(() => {
    moveSnake();
    if(isPlaying) drawSnake();
  }, 100);
});

// Initial draw
ctx.fillStyle = '#0a0a0a';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = '#ccff00';
ctx.font = '16px "Syncopate", sans-serif';
ctx.textAlign = 'center';
ctx.fillText('CLICK START GAME', canvas.width/2, canvas.height/2);


/* ==========================================================================
   HACKER TYPING TEST
   ========================================================================== */
const texts = [
  "sudo rm -rf /",
  "npm install react react-dom --save",
  "git commit -m 'fixed the bug finally'",
  "docker-compose up -d --build",
  "const matrix = new TheMatrix(); matrix.init();",
  "function hackMainframe() { return bypassFirewall(); }",
  "while (true) { console.log('wake up neo'); }"
];

const textDisplay = document.getElementById('typing-text');
const inputField = document.getElementById('type-input');
const wpmDisplay = document.getElementById('type-wpm');
const timeDisplay = document.getElementById('type-time');
const startBtn = document.getElementById('start-type');

let timeLeft = 30;
let typingTimer;
let currentWordIndex = 0;
let currentTextStr = "";
let isTyping = false;
let wordsTyped = 0;

function initTyping() {
  currentTextStr = texts.sort(() => 0.5 - Math.random()).slice(0, 4).join(" ");
  
  textDisplay.innerHTML = '';
  currentTextStr.split('').forEach(char => {
    const span = document.createElement('span');
    span.innerText = char;
    textDisplay.appendChild(span);
  });
  textDisplay.querySelector('span').classList.add('current');
}

startBtn.addEventListener('click', () => {
  initTyping();
  timeLeft = 30;
  wordsTyped = 0;
  timeDisplay.innerText = timeLeft;
  wpmDisplay.innerText = 0;
  isTyping = true;
  inputField.value = '';
  inputField.focus();
  inputField.style.pointerEvents = 'auto';
  
  clearInterval(typingTimer);
  typingTimer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timeDisplay.innerText = timeLeft;
    } else {
      clearInterval(typingTimer);
      isTyping = false;
      inputField.style.pointerEvents = 'none';
      inputField.blur();
      calculateWPM();
    }
  }, 1000);
});

inputField.addEventListener('input', () => {
  if (!isTyping) return;
  const arrayQuote = textDisplay.querySelectorAll('span');
  const arrayValue = inputField.value.split('');
  
  let correct = true;
  
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    
    characterSpan.classList.remove('current');
    
    if (character == null) {
      characterSpan.classList.remove('correct');
      characterSpan.classList.remove('incorrect');
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
    } else {
      characterSpan.classList.remove('correct');
      characterSpan.classList.add('incorrect');
      correct = false;
    }
  });

  if (arrayValue.length < arrayQuote.length) {
    arrayQuote[arrayValue.length].classList.add('current');
  }

  if (correct) {
    wordsTyped += currentTextStr.split(' ').length;
    inputField.value = '';
    initTyping();
  }
});

function calculateWPM() {
  // Rough WPM calculation: (total words / time in minutes)
  const wpm = Math.round((wordsTyped / 30) * 60);
  wpmDisplay.innerText = wpm;
  textDisplay.innerHTML = `<span style="color:var(--accent)">TEST COMPLETE. WPM: ${wpm}</span>`;
}
