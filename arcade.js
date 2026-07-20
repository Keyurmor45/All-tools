/* ==========================================================================
   ARCADE.JS — All 6 Games
   1. Y2K Snake
   2. Flappy Cyber
   3. Minesweeper
   4. Cyber Pong
   5. Tic Tac Toe
   6. Hacker Typing Test
   ========================================================================== */

/* ==========================================================================
   1. Y2K SNAKE
   ========================================================================== */
(function() {
  const canvas = document.getElementById('snake-board');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const G = 20;
  let snake, food, dx, dy, score, loop, playing;
  let high = localStorage.getItem('snake-high') || 0;
  document.getElementById('snake-high').textContent = high;

  function init() {
    snake = [{x:200,y:200},{x:180,y:200},{x:160,y:200}];
    dx = G; dy = 0; score = 0;
    document.getElementById('snake-score').textContent = 0;
    spawnFood();
    drawStatic();
  }
  function spawnFood() {
    food = {
      x: Math.floor(Math.random()*(canvas.width/G))*G,
      y: Math.floor(Math.random()*(canvas.height/G))*G
    };
  }
  function draw() {
    ctx.fillStyle = '#0a0a0a'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#ff00ff'; ctx.fillRect(food.x,food.y,G,G);
    snake.forEach((p,i) => {
      ctx.fillStyle = i===0 ? '#ccff00' : '#88aa00';
      ctx.fillRect(p.x,p.y,G-1,G-1);
    });
  }
  function drawStatic() {
    ctx.fillStyle='#0a0a0a'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#ccff00'; ctx.font='16px "Syncopate",sans-serif';
    ctx.textAlign='center'; ctx.fillText('CLICK START GAME',canvas.width/2,canvas.height/2);
  }
  function step() {
    const h = {x:snake[0].x+dx, y:snake[0].y+dy};
    if (h.x<0||h.x>=canvas.width||h.y<0||h.y>=canvas.height) return over();
    if (snake.some(p=>p.x===h.x&&p.y===h.y)) return over();
    snake.unshift(h);
    if (h.x===food.x&&h.y===food.y) { score+=10; document.getElementById('snake-score').textContent=score; spawnFood(); }
    else snake.pop();
    draw();
  }
  function over() {
    clearInterval(loop); playing=false;
    if (score>high) { high=score; localStorage.setItem('snake-high',high); document.getElementById('snake-high').textContent=high; }
    ctx.fillStyle='rgba(0,0,0,0.8)'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#ccff00'; ctx.font='22px "Syncopate",sans-serif';
    ctx.textAlign='center'; ctx.fillText('GAME OVER',canvas.width/2,canvas.height/2-10);
    ctx.font='14px "JetBrains Mono",monospace';
    ctx.fillText('Score: '+score,canvas.width/2,canvas.height/2+20);
  }

  document.addEventListener('keydown', e => {
    if (!playing) return;
    if ((e.key==='ArrowUp'||e.key==='w')&&dy===0){dx=0;dy=-G;e.preventDefault();}
    if ((e.key==='ArrowDown'||e.key==='s')&&dy===0){dx=0;dy=G;e.preventDefault();}
    if ((e.key==='ArrowLeft'||e.key==='a')&&dx===0){dx=-G;dy=0;e.preventDefault();}
    if ((e.key==='ArrowRight'||e.key==='d')&&dx===0){dx=G;dy=0;e.preventDefault();}
  });

  document.getElementById('start-snake').addEventListener('click', ()=>{
    clearInterval(loop); init(); playing=true;
    loop = setInterval(step, 100);
  });
  init();
})();


/* ==========================================================================
   2. FLAPPY CYBER
   ========================================================================== */
(function() {
  const canvas = document.getElementById('flappy-board');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  let bird, pipes, fScore, fBest = parseInt(localStorage.getItem('flappy-best')||0);
  let fLoop, fPlaying = false, fStarted = false;

  document.getElementById('flappy-best').textContent = fBest;

  const PIPE_GAP = 120, PIPE_W = 40, PIPE_SPEED = 2.5;
  const GRAVITY = 0.45, FLAP = -7;

  function fInit() {
    bird = {x:80, y:H/2, vy:0, r:12};
    pipes = []; fScore = 0;
    document.getElementById('flappy-score').textContent = 0;
    fStarted = false;
    fDrawIdle();
  }
  function fDrawIdle() {
    ctx.fillStyle='#0a0a0a'; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#ccff00'; ctx.font='16px "Syncopate",sans-serif';
    ctx.textAlign='center'; ctx.fillText('CLICK START GAME',W/2,H/2);
  }
  function fFlap() {
    if (!fPlaying) return;
    bird.vy = FLAP;
  }
  function fSpawnPipe() {
    const topH = Math.floor(Math.random()*(H-PIPE_GAP-80))+40;
    pipes.push({x:W, topH});
  }
  function fStep() {
    ctx.fillStyle='#0a0a0a'; ctx.fillRect(0,0,W,H);

    // Bird physics
    bird.vy += GRAVITY; bird.y += bird.vy;

    // Draw bird (neon diamond)
    ctx.save(); ctx.translate(bird.x, bird.y);
    ctx.fillStyle='#ccff00';
    ctx.beginPath(); ctx.moveTo(0,-bird.r); ctx.lineTo(bird.r,0); ctx.lineTo(0,bird.r); ctx.lineTo(-bird.r,0); ctx.closePath(); ctx.fill();
    ctx.restore();

    // Pipes
    if (fStarted && (pipes.length===0 || pipes[pipes.length-1].x < W-200)) fSpawnPipe();

    ctx.fillStyle='#ff4500';
    pipes.forEach(p => {
      p.x -= PIPE_SPEED;
      ctx.fillRect(p.x, 0, PIPE_W, p.topH);
      ctx.fillRect(p.x, p.topH+PIPE_GAP, PIPE_W, H-p.topH-PIPE_GAP);
      // Score
      if (p.x+PIPE_W < bird.x && !p.passed) { p.passed=true; fScore++; document.getElementById('flappy-score').textContent=fScore; }
      // Collision
      if (bird.x+bird.r>p.x && bird.x-bird.r<p.x+PIPE_W) {
        if (bird.y-bird.r<p.topH || bird.y+bird.r>p.topH+PIPE_GAP) fOver();
      }
    });
    pipes = pipes.filter(p=>p.x>-PIPE_W);

    // Floor/ceiling
    if (bird.y+bird.r>H || bird.y-bird.r<0) fOver();

    // HUD
    ctx.fillStyle='#ccff00'; ctx.font='20px "Syncopate",sans-serif'; ctx.textAlign='center';
    if (!fStarted) ctx.fillText('SPACE / CLICK TO FLAP',W/2,H/2);
  }
  function fOver() {
    cancelAnimationFrame(fLoop); fPlaying=false;
    if (fScore>fBest) { fBest=fScore; localStorage.setItem('flappy-best',fBest); document.getElementById('flappy-best').textContent=fBest; }
    ctx.fillStyle='rgba(0,0,0,0.85)'; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#ff4500'; ctx.font='22px "Syncopate",sans-serif'; ctx.textAlign='center';
    ctx.fillText('GAME OVER',W/2,H/2-15);
    ctx.fillStyle='#ccff00'; ctx.font='14px "JetBrains Mono",monospace';
    ctx.fillText('Score: '+fScore+'  Best: '+fBest,W/2,H/2+15);
  }
  function fAnimate() { fStep(); if(fPlaying) fLoop=requestAnimationFrame(fAnimate); }

  document.getElementById('start-flappy').addEventListener('click',()=>{
    cancelAnimationFrame(fLoop); fPlaying=true; fInit();
    fPlaying=true; fStarted=true; fAnimate();
  });
  canvas.addEventListener('click', fFlap);
  document.addEventListener('keydown', e=>{ if(e.code==='Space'&&fPlaying){e.preventDefault();fFlap();} });
  fDrawIdle();
})();


/* ==========================================================================
   3. MINESWEEPER
   ========================================================================== */
(function() {
  const grid = document.getElementById('mine-grid');
  if (!grid) return;
  const ROWS=9, COLS=9, MINES=10;
  let board, revealed, flagged, mTimer, mTime, mStarted, mGameOver;

  function initMine() {
    clearInterval(mTimer); mTime=0; mStarted=false; mGameOver=false;
    document.getElementById('mine-time').textContent=0;
    document.getElementById('mine-count').textContent=MINES;
    board=Array(ROWS*COLS).fill(0);
    revealed=Array(ROWS*COLS).fill(false);
    flagged=Array(ROWS*COLS).fill(false);

    // Place mines
    let placed=0;
    while(placed<MINES){const i=Math.floor(Math.random()*ROWS*COLS);if(board[i]!==-1){board[i]=-1;placed++;}}
    // Count neighbours
    for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++){
      if(board[r*COLS+c]===-1)continue;
      let n=0;
      for(let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++){
        const nr=r+dr,nc=c+dc;
        if(nr>=0&&nr<ROWS&&nc>=0&&nc<COLS&&board[nr*COLS+nc]===-1)n++;
      }
      board[r*COLS+c]=n;
    }
    renderMine();
  }

  function renderMine() {
    grid.innerHTML='';
    for(let i=0;i<ROWS*COLS;i++){
      const cell=document.createElement('div');
      cell.className='mine-cell';
      if(revealed[i]){
        cell.classList.add('revealed');
        if(board[i]===-1){cell.classList.add('boom');cell.textContent='💣';}
        else if(board[i]>0){cell.textContent=board[i];cell.dataset.n=board[i];}
      } else if(flagged[i]){
        cell.classList.add('flagged');cell.textContent='🚩';
      }
      cell.addEventListener('click',()=>mClick(i));
      cell.addEventListener('contextmenu',e=>{e.preventDefault();mFlag(i);});
      grid.appendChild(cell);
    }
  }

  function mClick(i) {
    if(mGameOver||revealed[i]||flagged[i])return;
    if(!mStarted){mStarted=true;mTimer=setInterval(()=>{mTime++;document.getElementById('mine-time').textContent=mTime;},1000);}
    if(board[i]===-1){revealed[i]=true;mGameOver=true;clearInterval(mTimer);revealed=revealed.map((_,j)=>board[j]===-1?true:revealed[j]);renderMine();return;}
    floodReveal(i); renderMine(); checkWin();
  }
  function floodReveal(i) {
    if(i<0||i>=ROWS*COLS||revealed[i]||flagged[i])return;
    revealed[i]=true;
    if(board[i]===0){const r=Math.floor(i/COLS),c=i%COLS;
      for(let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++){const nr=r+dr,nc=c+dc;if(nr>=0&&nr<ROWS&&nc>=0&&nc<COLS)floodReveal(nr*COLS+nc);}
    }
  }
  function mFlag(i) {
    if(mGameOver||revealed[i])return;
    flagged[i]=!flagged[i];renderMine();
  }
  function checkWin() {
    const safe=board.filter(v=>v!==-1).length;
    if(revealed.filter((_,i)=>board[i]!==-1&&revealed[i]).length===safe){
      mGameOver=true;clearInterval(mTimer);
      setTimeout(()=>alert('🎉 YOU WIN! Time: '+mTime+'s'),100);
    }
  }

  document.getElementById('start-mine').addEventListener('click',initMine);
  initMine();
})();


/* ==========================================================================
   4. CYBER PONG
   ========================================================================== */
(function() {
  const canvas = document.getElementById('pong-board');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W=canvas.width, H=canvas.height;
  const PW=10, PH=60, BALL=8;
  let pY, cpuY, bX, bY, bvX, bvY, pScore, cpuScore, pLoop, pPlaying=false;

  function pInit() {
    pY=H/2-PH/2; cpuY=H/2-PH/2;
    bX=W/2; bY=H/2; bvX=3; bvY=2;
    pScore=0; cpuScore=0;
    document.getElementById('pong-p').textContent=0;
    document.getElementById('pong-cpu').textContent=0;
    pDrawIdle();
  }
  function pDrawIdle() {
    ctx.fillStyle='#0a0a0a'; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#ccff00'; ctx.font='14px "Syncopate",sans-serif';
    ctx.textAlign='center'; ctx.fillText('CLICK START GAME',W/2,H/2);
  }
  function pDraw() {
    ctx.fillStyle='#0a0a0a'; ctx.fillRect(0,0,W,H);
    // Net
    ctx.setLineDash([8,8]); ctx.strokeStyle='#333'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(W/2,0); ctx.lineTo(W/2,H); ctx.stroke(); ctx.setLineDash([]);
    // Paddles
    ctx.fillStyle='#ccff00'; ctx.fillRect(10,pY,PW,PH);
    ctx.fillStyle='#ff4500'; ctx.fillRect(W-20,cpuY,PW,PH);
    // Ball
    ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(bX,bY,BALL,0,Math.PI*2); ctx.fill();
  }
  function pStep() {
    // Ball
    bX+=bvX; bY+=bvY;
    if(bY-BALL<0||bY+BALL>H){bvY*=-1;}
    // Player paddle
    if(bX-BALL<20+PW && bY>pY && bY<pY+PH){bvX=Math.abs(bvX);bvX*=1.03;bvY+=((bY-(pY+PH/2))/PH)*3;}
    // CPU paddle
    if(bX+BALL>W-20-PW && bY>cpuY && bY<cpuY+PH){bvX=-Math.abs(bvX);}
    // CPU AI
    const cpuCenter=cpuY+PH/2;
    if(cpuCenter<bY-5) cpuY+=3;
    else if(cpuCenter>bY+5) cpuY-=3;
    cpuY=Math.max(0,Math.min(H-PH,cpuY));
    // Score
    if(bX<0){cpuScore++;document.getElementById('pong-cpu').textContent=cpuScore;bX=W/2;bY=H/2;bvX=3;bvY=2;}
    if(bX>W){pScore++;document.getElementById('pong-p').textContent=pScore;bX=W/2;bY=H/2;bvX=-3;bvY=2;}
    pDraw();
  }

  // Mouse / touch control
  canvas.addEventListener('mousemove',e=>{const r=canvas.getBoundingClientRect();pY=e.clientY-r.top-PH/2;pY=Math.max(0,Math.min(H-PH,pY));});
  canvas.addEventListener('touchmove',e=>{e.preventDefault();const r=canvas.getBoundingClientRect();pY=e.touches[0].clientY-r.top-PH/2;pY=Math.max(0,Math.min(H-PH,pY));},{passive:false});

  document.getElementById('start-pong').addEventListener('click',()=>{
    clearInterval(pLoop); pPlaying=true; pInit();
    pLoop=setInterval(pStep,16);
  });
  pInit();
})();


/* ==========================================================================
   5. TIC TAC TOE vs CPU (Minimax)
   ========================================================================== */
(function() {
  const grid = document.getElementById('ttt-grid');
  if (!grid) return;
  let board = Array(9).fill('');
  let gameOver = false;

  const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

  function checkWinner(b, p) { return wins.some(([a,c,d])=>b[a]===p&&b[c]===p&&b[d]===p); }
  function minimax(b, isMax) {
    if(checkWinner(b,'O'))return{score:10};if(checkWinner(b,'X'))return{score:-10};
    if(b.every(c=>c!==''))return{score:0};
    const moves=[];
    b.forEach((_,i)=>{if(b[i]===''){const nb=[...b];nb[i]=isMax?'O':'X';const r=minimax(nb,!isMax);moves.push({i,score:r.score});}});
    return moves.reduce((a,b)=>isMax?(b.score>a.score?b:a):(b.score<a.score?b:a));
  }
  function cpuMove() {
    const best=minimax([...board],true);
    if(best&&best.i!==undefined){board[best.i]='O';render();}
  }
  function render() {
    grid.querySelectorAll('.ttt-cell').forEach((c,i)=>{
      c.textContent=board[i]==='X'?'✕':board[i]==='O'?'○':'';
      c.classList.remove('winner');
    });
    // Highlight winner
    wins.forEach(([a,b,c])=>{
      if(board[a]&&board[a]===board[b]&&board[b]===board[c]){
        [a,b,c].forEach(i=>grid.querySelectorAll('.ttt-cell')[i].classList.add('winner'));
      }
    });
    const status=document.getElementById('ttt-status');
    if(checkWinner(board,'X')){status.textContent='🎉 YOU WIN!';gameOver=true;}
    else if(checkWinner(board,'O')){status.textContent='🤖 CPU WINS!';gameOver=true;}
    else if(board.every(c=>c!=='')){status.textContent='🤝 DRAW!';gameOver=true;}
    else status.textContent='YOUR TURN — YOU ARE ✕';
  }

  grid.querySelectorAll('.ttt-cell').forEach((c,i)=>{
    c.addEventListener('click',()=>{
      if(gameOver||board[i]!=='')return;
      board[i]='X'; render();
      if(!gameOver)setTimeout(()=>{cpuMove();},200);
    });
  });

  document.getElementById('reset-ttt').addEventListener('click',()=>{
    board=Array(9).fill('');gameOver=false;render();
  });
  render();
})();


/* ==========================================================================
   6. HACKER TYPING TEST
   ========================================================================== */
(function() {
  const textDisplay = document.getElementById('typing-text');
  if (!textDisplay) return;
  const inputField = document.getElementById('type-input');
  const wpmDisplay = document.getElementById('type-wpm');
  const accDisplay = document.getElementById('type-acc');
  const timeDisplay = document.getElementById('type-time');
  const startBtn = document.getElementById('start-type');

  const texts = [
    "sudo rm -rf /", "npm install react react-dom --save",
    "git commit -m 'fixed the bug finally'", "docker-compose up -d --build",
    "const matrix = new TheMatrix(); matrix.init();",
    "function hackMainframe() { return bypassFirewall(); }",
    "while (true) { console.log('wake up neo'); }",
    "SELECT * FROM users WHERE password IS NULL;",
    "ping -t 127.0.0.1 -n 999 /dev/null",
    "ssh root@192.168.0.1 -p 22 -i ~/.ssh/id_rsa"
  ];

  let timeLeft=30, typingTimer, isTyping=false, wordsTyped=0, totalChars=0, wrongChars=0, currentText='';

  function initTyping() {
    currentText = texts.sort(()=>0.5-Math.random()).slice(0,3).join(' ');
    textDisplay.innerHTML='';
    currentText.split('').forEach(ch=>{
      const s=document.createElement('span'); s.textContent=ch; textDisplay.appendChild(s);
    });
    textDisplay.querySelector('span').classList.add('current');
  }

  startBtn.addEventListener('click',()=>{
    initTyping(); timeLeft=30; wordsTyped=0; totalChars=0; wrongChars=0;
    timeDisplay.textContent=30; wpmDisplay.textContent=0; if(accDisplay)accDisplay.textContent=100;
    isTyping=true; inputField.value=''; inputField.style.pointerEvents='auto'; inputField.focus();
    clearInterval(typingTimer);
    typingTimer=setInterval(()=>{
      if(timeLeft>0){timeLeft--;timeDisplay.textContent=timeLeft;}
      else{clearInterval(typingTimer);isTyping=false;inputField.style.pointerEvents='none';inputField.blur();calcWPM();}
    },1000);
  });

  inputField.addEventListener('input',()=>{
    if(!isTyping)return;
    const spans=textDisplay.querySelectorAll('span');
    const val=inputField.value.split('');
    let correct=true;
    spans.forEach((s,i)=>{
      s.classList.remove('current','correct','incorrect');
      if(val[i]==null){correct=false;}
      else if(val[i]===s.textContent){s.classList.add('correct');}
      else{s.classList.add('incorrect');correct=false;}
    });
    if(val.length<spans.length)spans[val.length].classList.add('current');
    if(correct){
      wordsTyped+=currentText.split(' ').length;
      totalChars+=currentText.length;
      inputField.value=''; initTyping();
    }
    const acc=totalChars>0?Math.round(((totalChars-wrongChars)/totalChars)*100):100;
    if(accDisplay)accDisplay.textContent=acc;
  });

  function calcWPM() {
    const wpm=Math.round((wordsTyped/30)*60);
    wpmDisplay.textContent=wpm;
    textDisplay.innerHTML=`<span style="color:var(--accent);font-size:1.2rem;">TEST COMPLETE — ${wpm} WPM</span>`;
  }
})();
