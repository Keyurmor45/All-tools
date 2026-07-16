window.TOOLS.push(
  // 1. Tic-Tac-Toe
  {
    id: 'game-tic-tac-toe',
    name: 'Tic-Tac-Toe',
    desc: 'Play a classic game of Tic-Tac-Toe against a friend.',
    icon: '❌',
    category: 'fun',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io" style="align-items:center; text-align:center;">
          <h3 id="ttt-status" style="margin-bottom:15px; font-weight:bold; font-size:1.2rem;">Player X's Turn</h3>
          <div style="display:grid; grid-template-columns:repeat(3, 80px); gap:5px; background:var(--bg-card); padding:5px; border-radius:10px;">
            ${[0,1,2,3,4,5,6,7,8].map(i => `<button class="ttt-cell" data-idx="${i}" style="width:80px; height:80px; font-size:2rem; font-weight:bold; border:none; border-radius:5px; background:var(--bg); cursor:pointer; display:flex; align-items:center; justify-content:center;"></button>`).join('')}
          </div>
          <button class="cyber-btn" id="ttt-reset" style="margin-top:20px;">Restart Game</button>
        </div>
      `;
      let board = Array(9).fill(null);
      let xTurn = true;
      let active = true;
      const status = el.querySelector('#ttt-status');
      const cells = el.querySelectorAll('.ttt-cell');
      
      const checkWin = () => {
        const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for(let w of wins) {
          if(board[w[0]] && board[w[0]] === board[w[1]] && board[w[0]] === board[w[2]]) return board[w[0]];
        }
        return board.includes(null) ? null : 'Draw';
      };

      cells.forEach(c => c.addEventListener('click', (e) => {
        const idx = e.target.dataset.idx;
        if(!active || board[idx]) return;
        board[idx] = xTurn ? 'X' : 'O';
        e.target.textContent = board[idx];
        e.target.style.color = xTurn ? 'var(--accent-warm)' : '#ff5555';
        
        const w = checkWin();
        if(w) {
          active = false;
          status.textContent = w === 'Draw' ? "It's a Draw!" : `Player ${w} Wins! 🎉`;
        } else {
          xTurn = !xTurn;
          status.textContent = `Player ${xTurn ? 'X' : 'O'}'s Turn`;
        }
      }));

      el.querySelector('#ttt-reset').addEventListener('click', () => {
        board = Array(9).fill(null);
        xTurn = true;
        active = true;
        status.textContent = `Player X's Turn`;
        cells.forEach(c => { c.textContent = ''; });
      });
    }
  },

  // 2. Memory Matching
  {
    id: 'game-memory',
    name: 'Memory Match',
    desc: 'Test your memory by matching pairs of emojis.',
    icon: '🧠',
    category: 'fun',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io" style="align-items:center; text-align:center;">
          <h3 id="mem-status" style="margin-bottom:15px; font-weight:bold; font-size:1.2rem;">Moves: 0</h3>
          <div id="mem-grid" style="display:grid; grid-template-columns:repeat(4, 60px); gap:10px; margin-bottom:20px;"></div>
          <button class="cyber-btn" id="mem-reset">Restart Game</button>
        </div>
      `;
      const emojis = ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼'];
      let cards = [];
      let flipped = [];
      let matched = 0;
      let moves = 0;
      let lock = false;
      const grid = el.querySelector('#mem-grid');
      const status = el.querySelector('#mem-status');

      const init = () => {
        grid.innerHTML = '';
        cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
        flipped = [];
        matched = 0;
        moves = 0;
        lock = false;
        status.textContent = `Moves: 0`;
        
        cards.forEach((e, i) => {
          const btn = document.createElement('button');
          btn.style.cssText = 'width:60px; height:60px; font-size:1.8rem; border-radius:8px; border:none; background:var(--bg-card); cursor:pointer; transition:transform 0.2s;';
          btn.dataset.idx = i;
          btn.addEventListener('click', () => flip(btn, e));
          grid.appendChild(btn);
        });
      };

      const flip = (btn, emoji) => {
        if(lock || btn.textContent || btn.classList.contains('matched')) return;
        btn.textContent = emoji;
        btn.style.background = 'var(--accent-warm)';
        flipped.push({btn, emoji});
        
        if(flipped.length === 2) {
          moves++;
          status.textContent = `Moves: ${moves}`;
          lock = true;
          if(flipped[0].emoji === flipped[1].emoji) {
            flipped.forEach(f => {
              f.btn.classList.add('matched');
              f.btn.style.background = 'rgba(0,255,255,0.2)';
            });
            matched++;
            flipped = [];
            lock = false;
            if(matched === emojis.length) status.textContent = `You won in ${moves} moves! 🎉`;
          } else {
            setTimeout(() => {
              flipped.forEach(f => {
                f.btn.textContent = '';
                f.btn.style.background = 'var(--bg-card)';
              });
              flipped = [];
              lock = false;
            }, 1000);
          }
        }
      };

      el.querySelector('#mem-reset').addEventListener('click', init);
      init();
    }
  },

  // 3. Reaction Time
  {
    id: 'game-reaction',
    name: 'Reaction Time Test',
    desc: 'Test your reflexes! Click as soon as the screen turns green.',
    icon: '⚡',
    category: 'fun',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io" style="align-items:center;">
          <div id="rx-box" style="width:100%; height:250px; background:var(--bg-card); border-radius:12px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:1.5rem; font-weight:bold; color:var(--text-primary); text-align:center; transition:background 0.1s; user-select:none;">
            Click to start
          </div>
        </div>
      `;
      const box = el.querySelector('#rx-box');
      let state = 'idle'; // idle, waiting, ready
      let timer = null;
      let startT = 0;

      box.addEventListener('click', () => {
        if(state === 'idle') {
          box.textContent = "Wait for green...";
          box.style.background = '#ff5555'; // Red
          box.style.color = '#fff';
          state = 'waiting';
          const waitT = 1000 + Math.random() * 3000;
          timer = setTimeout(() => {
            state = 'ready';
            box.style.background = '#55ff55'; // Green
            box.textContent = "CLICK NOW!";
            startT = Date.now();
          }, waitT);
        } else if(state === 'waiting') {
          clearTimeout(timer);
          box.textContent = "Too early! Click to try again.";
          box.style.background = 'var(--bg-card)';
          box.style.color = 'var(--text-primary)';
          state = 'idle';
        } else if(state === 'ready') {
          const rx = Date.now() - startT;
          box.textContent = `Your time: ${rx}ms! Click to restart.`;
          box.style.background = 'var(--accent-warm)';
          box.style.color = '#000';
          state = 'idle';
        }
      });
    }
  },

  // 4. Rock Paper Scissors
  {
    id: 'game-rps',
    name: 'Rock Paper Scissors',
    desc: 'Play the classic game against the AI.',
    icon: '✊',
    category: 'fun',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io" style="text-align:center;">
          <div style="font-size:3rem; margin-bottom:20px; display:flex; justify-content:center; gap:30px;">
            <div id="rps-user">❔</div>
            <div>VS</div>
            <div id="rps-bot">❔</div>
          </div>
          <h3 id="rps-status" style="margin-bottom:20px;">Make your move</h3>
          <div style="display:flex; justify-content:center; gap:10px;">
            <button class="cyber-btn" data-move="✊" style="font-size:2rem; padding:10px 20px;">✊</button>
            <button class="cyber-btn" data-move="✋" style="font-size:2rem; padding:10px 20px;">✋</button>
            <button class="cyber-btn" data-move="✌️" style="font-size:2rem; padding:10px 20px;">✌️</button>
          </div>
          <div style="margin-top:20px; color:var(--text-secondary);">Score: <span id="rps-score">0 - 0</span></div>
        </div>
      `;
      let wins = 0;
      let losses = 0;
      const opts = ['✊','✋','✌️'];
      const uBox = el.querySelector('#rps-user');
      const bBox = el.querySelector('#rps-bot');
      const status = el.querySelector('#rps-status');
      const score = el.querySelector('#rps-score');

      el.querySelectorAll('.rps-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const u = e.target.dataset.move;
          const b = opts[Math.floor(Math.random()*3)];
          uBox.textContent = u;
          bBox.textContent = b;
          
          if(u === b) { status.textContent = "It's a Tie!"; }
          else if((u==='✊'&&b==='✌️') || (u==='✋'&&b==='✊') || (u==='✌️'&&b==='✋')) {
            status.textContent = "You Win! 🎉"; wins++;
          } else {
            status.textContent = "Bot Wins! 🤖"; losses++;
          }
          score.textContent = `${wins} - ${losses}`;
        });
      });
    }
  },

  // 5. Typing Speed Test
  {
    id: 'game-typing',
    name: 'Typing Speed Test',
    desc: 'Test your WPM (Words Per Minute).',
    icon: '⌨️',
    category: 'fun',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <div class="io-box">
             <div id="type-target" style="padding:15px; background:var(--bg-card); border-radius:8px; margin-bottom:10px; font-size:1.1rem; line-height:1.5; font-family:var(--font-mono); user-select:none;"></div>
             <textarea id="type-in" class="io-textarea" placeholder="Start typing here..." style="height:100px;"></textarea>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
             <div style="font-size:1.2rem; font-weight:bold;">WPM: <span id="type-wpm" style="color:var(--accent-warm);">0</span></div>
             <button class="cyber-btn" id="type-reset">Reset</button>
          </div>
        </div>
      `;
      const sentences = [
        "The quick brown fox jumps over the lazy dog.",
        "Programming is the art of telling another human what one wants the computer to do.",
        "A journey of a thousand miles begins with a single step.",
        "To be or not to be, that is the question."
      ];
      let target = "";
      let startT = null;
      let ended = false;
      
      const tBox = el.querySelector('#type-target');
      const inBox = el.querySelector('#type-in');
      const wpmBox = el.querySelector('#type-wpm');

      const init = () => {
        target = sentences[Math.floor(Math.random()*sentences.length)];
        tBox.textContent = target;
        inBox.value = '';
        inBox.disabled = false;
        wpmBox.textContent = '0';
        startT = null;
        ended = false;
        inBox.focus();
      };

      inBox.addEventListener('input', () => {
        if(ended) return;
        if(!startT) startT = Date.now();
        const val = inBox.value;
        if(val === target) {
          ended = true;
          inBox.disabled = true;
          const timeM = (Date.now() - startT) / 60000;
          const words = target.split(' ').length;
          wpmBox.textContent = Math.round(words / timeM);
          tBox.innerHTML = '<span style="color:var(--accent-warm);">Perfect! 🎉</span>';
        } else {
          // Highlight incorrect
          let html = '';
          for(let i=0; i<target.length; i++) {
             if(i < val.length) {
                if(val[i] === target[i]) html += `<span style="color:var(--accent-warm);">${target[i]}</span>`;
                else html += `<span style="color:var(--accent-red); text-decoration:underline;">${target[i]}</span>`;
             } else {
                html += target[i];
             }
          }
          tBox.innerHTML = html;
        }
      });

      el.querySelector('#type-reset').addEventListener('click', init);
      init();
    }
  },

  // 6. Guess the Number
  {
    id: 'game-guess-num',
    name: 'Guess the Number',
    desc: 'Guess a secret number between 1 and 100.',
    icon: '🔢',
    category: 'fun',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io" style="align-items:center; text-align:center;">
          <h3 style="margin-bottom:10px;">I'm thinking of a number between 1 and 100...</h3>
          <p id="gn-status" style="margin-bottom:20px; font-weight:bold; font-size:1.2rem;">0 Guesses</p>
          <div style="display:flex; gap:10px; justify-content:center; max-width:300px; width:100%;">
            <input type="number" id="gn-in" class="io-input" placeholder="Your guess" min="1" max="100">
            <button class="cyber-btn" id="gn-btn">Guess</button>
          </div>
          <button class="cyber-btn" id="gn-reset" style="margin-top:20px;">Play Again</button>
        </div>
      `;
      let num = 0;
      let guesses = 0;
      let active = true;
      const inn = el.querySelector('#gn-in');
      const status = el.querySelector('#gn-status');

      const init = () => {
        num = Math.floor(Math.random()*100) + 1;
        guesses = 0;
        active = true;
        status.textContent = '0 Guesses';
        status.style.color = 'var(--text-primary)';
        inn.value = '';
        inn.focus();
      };

      const guess = () => {
        if(!active) return;
        const v = parseInt(inn.value);
        if(!v || v<1 || v>100) return;
        guesses++;
        if(v === num) {
          active = false;
          status.textContent = `Correct! It was ${num} (Took ${guesses} guesses) 🎉`;
          status.style.color = 'var(--accent-warm)';
        } else if(v > num) {
          status.textContent = "Too High! 📉";
        } else {
          status.textContent = "Too Low! 📈";
        }
        inn.value = '';
        inn.focus();
      };

      el.querySelector('#gn-btn').addEventListener('click', guess);
      inn.addEventListener('keyup', (e) => { if(e.key==='Enter') guess(); });
      el.querySelector('#gn-reset').addEventListener('click', init);
      init();
    }
  },

  // 7. Whack-a-Mole
  {
    id: 'game-whack',
    name: 'Whack-a-Mole',
    desc: 'Whack as many moles as you can in 30 seconds!',
    icon: '🔨',
    category: 'fun',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io" style="align-items:center; text-align:center;">
          <div style="display:flex; justify-content:space-between; width:100%; max-width:300px; margin-bottom:10px; font-weight:bold; font-size:1.2rem;">
             <div>Score: <span id="wam-score" style="color:var(--accent-warm);">0</span></div>
             <div>Time: <span id="wam-time">30</span>s</div>
          </div>
          <div style="display:grid; grid-template-columns:repeat(3, 80px); gap:10px; margin-bottom:20px;">
             ${[...Array(9)].map((_,i) => `<div class="wam-hole" style="width:80px; height:80px; background:var(--bg-card); border-radius:50%; position:relative; overflow:hidden;"><div class="wam-mole" data-idx="${i}" style="position:absolute; bottom:-80px; left:0; width:100%; height:100%; background:var(--accent-warm); border-radius:50%; transition:bottom 0.1s; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:2.5rem;">🐹</div></div>`).join('')}
          </div>
          <button class="cyber-btn" id="wam-start">Start Game</button>
        </div>
      `;
      const moles = el.querySelectorAll('.wam-mole');
      const sBox = el.querySelector('#wam-score');
      const tBox = el.querySelector('#wam-time');
      const startBtn = el.querySelector('#wam-start');
      let score = 0;
      let time = 30;
      let active = false;
      let timerId = null;
      let popId = null;
      let currIdx = -1;

      const pop = () => {
        if(!active) return;
        if(currIdx !== -1) moles[currIdx].style.bottom = '-80px';
        currIdx = Math.floor(Math.random()*9);
        moles[currIdx].style.bottom = '0px';
        popId = setTimeout(pop, 600 + Math.random()*800);
      };

      moles.forEach(m => m.addEventListener('mousedown', () => {
        if(!active || m.style.bottom === '-80px') return;
        score++;
        sBox.textContent = score;
        m.style.bottom = '-80px'; // Hide immediately on whack
      }));

      startBtn.addEventListener('click', () => {
        if(active) return;
        score = 0;
        time = 30;
        active = true;
        sBox.textContent = score;
        tBox.textContent = time;
        startBtn.disabled = true;
        
        timerId = setInterval(() => {
          time--;
          tBox.textContent = time;
          if(time <= 0) {
             active = false;
             clearInterval(timerId);
             clearTimeout(popId);
             if(currIdx !== -1) moles[currIdx].style.bottom = '-80px';
             startBtn.disabled = false;
             startBtn.textContent = 'Play Again';
             alert(`Time's up! Your score: ${score}`);
          }
        }, 1000);
        pop();
      });
    }
  },

  // 8. Simon Says
  {
    id: 'game-simon',
    name: 'Simon Says',
    desc: 'Repeat the pattern of flashing colors.',
    icon: '🚥',
    category: 'fun',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io" style="align-items:center; text-align:center;">
          <h3 id="sim-status" style="margin-bottom:20px; font-weight:bold;">Press Start</h3>
          <div style="display:grid; grid-template-columns:100px 100px; gap:10px; margin-bottom:20px;">
             <div class="sim-btn" data-color="0" style="width:100px; height:100px; background:#ff5555; border-radius:10px; cursor:pointer; opacity:0.5; transition:opacity 0.1s;"></div>
             <div class="sim-btn" data-color="1" style="width:100px; height:100px; background:#55ff55; border-radius:10px; cursor:pointer; opacity:0.5; transition:opacity 0.1s;"></div>
             <div class="sim-btn" data-color="2" style="width:100px; height:100px; background:#5555ff; border-radius:10px; cursor:pointer; opacity:0.5; transition:opacity 0.1s;"></div>
             <div class="sim-btn" data-color="3" style="width:100px; height:100px; background:#ffff55; border-radius:10px; cursor:pointer; opacity:0.5; transition:opacity 0.1s;"></div>
          </div>
          <button class="cyber-btn" id="sim-start">Start Game</button>
        </div>
      `;
      let seq = [];
      let playerStep = 0;
      let active = false;
      const status = el.querySelector('#sim-status');
      const btns = el.querySelectorAll('.sim-btn');
      
      const flash = (idx) => {
        return new Promise(res => {
          btns[idx].style.opacity = '1';
          setTimeout(() => {
            btns[idx].style.opacity = '0.5';
            setTimeout(res, 200); // gap between flashes
          }, 400); // flash duration
        });
      };

      const playSeq = async () => {
        active = false;
        status.textContent = 'Watch the pattern...';
        for(let s of seq) await flash(s);
        status.textContent = 'Your turn!';
        active = true;
      };

      btns.forEach(btn => btn.addEventListener('mousedown', () => {
        if(!active) return;
        const c = parseInt(btn.dataset.color);
        btn.style.opacity = '1';
        setTimeout(() => btn.style.opacity = '0.5', 200);
        
        if(c !== seq[playerStep]) {
          active = false;
          status.textContent = `Game Over! Score: ${seq.length - 1}`;
          el.querySelector('#sim-start').style.display = 'block';
          return;
        }
        playerStep++;
        if(playerStep === seq.length) {
          seq.push(Math.floor(Math.random()*4));
          playerStep = 0;
          setTimeout(playSeq, 1000);
        }
      }));

      el.querySelector('#sim-start').addEventListener('click', (e) => {
        e.target.style.display = 'none';
        seq = [Math.floor(Math.random()*4)];
        playerStep = 0;
        playSeq();
      });
    }
  },

  // 9. Math Sprint
  {
    id: 'game-math-sprint',
    name: 'Math Sprint',
    desc: 'Answer as many simple math questions as you can in 30 seconds.',
    icon: '➕',
    category: 'fun',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io" style="align-items:center; text-align:center;">
          <div style="display:flex; justify-content:space-between; width:100%; max-width:300px; margin-bottom:10px; font-weight:bold;">
             <div>Score: <span id="ms-score" style="color:var(--accent-warm);">0</span></div>
             <div>Time: <span id="ms-time">30</span>s</div>
          </div>
          <div id="ms-q" style="font-size:2.5rem; font-weight:bold; margin:20px 0;">? + ? =</div>
          <div style="display:flex; gap:10px; max-width:200px;">
             <input type="number" id="ms-ans" class="io-input" style="text-align:center;" disabled>
          </div>
          <button class="cyber-btn" id="ms-start" style="margin-top:20px;">Start Sprint</button>
        </div>
      `;
      const qBox = el.querySelector('#ms-q');
      const ansBox = el.querySelector('#ms-ans');
      const sBox = el.querySelector('#ms-score');
      const tBox = el.querySelector('#ms-time');
      const startBtn = el.querySelector('#ms-start');
      let score = 0, time = 30, active = false, timer = null, ans = 0;

      const genQ = () => {
        const ops = ['+','-','*'];
        const op = ops[Math.floor(Math.random()*ops.length)];
        let a = Math.floor(Math.random()*15) + 1;
        let b = Math.floor(Math.random()*15) + 1;
        if(op === '-') { if(b>a) { let t=a;a=b;b=t; } } // ensure positive
        else if(op === '*') { a=a%10+1; b=b%10+1; } // smaller mults
        
        qBox.textContent = `${a} ${op} ${b} =`;
        ans = op==='+' ? a+b : (op==='-' ? a-b : a*b);
        ansBox.value = '';
      };

      ansBox.addEventListener('input', () => {
        if(!active) return;
        if(parseInt(ansBox.value) === ans) {
          score++;
          sBox.textContent = score;
          genQ();
        }
      });

      startBtn.addEventListener('click', () => {
        score = 0; time = 30; active = true;
        sBox.textContent = score; tBox.textContent = time;
        startBtn.style.display = 'none';
        ansBox.disabled = false;
        ansBox.focus();
        genQ();
        
        timer = setInterval(() => {
          time--; tBox.textContent = time;
          if(time <= 0) {
            clearInterval(timer);
            active = false;
            ansBox.disabled = true;
            qBox.textContent = 'Time Up!';
            startBtn.style.display = 'block';
            startBtn.textContent = 'Play Again';
          }
        }, 1000);
      });
    }
  },

  // 10. Word Scramble
  {
    id: 'game-scramble',
    name: 'Word Scramble',
    desc: 'Unscramble the letters to find the word.',
    icon: '🔠',
    category: 'fun',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io" style="align-items:center; text-align:center;">
          <h3 style="margin-bottom:5px;">Unscramble the word:</h3>
          <div id="ws-word" style="font-size:2.5rem; font-weight:bold; letter-spacing:5px; margin-bottom:20px; color:var(--accent-warm);">W O R D</div>
          <div style="display:flex; gap:10px; justify-content:center; max-width:300px; width:100%;">
            <input type="text" id="ws-in" class="io-input" placeholder="Your answer" style="text-transform:uppercase;">
            <button class="cyber-btn" id="ws-btn">Check</button>
          </div>
          <p id="ws-status" style="margin-top:15px; font-weight:bold;"></p>
          <button class="cyber-btn" id="ws-next" style="margin-top:15px; display:none;">Next Word</button>
        </div>
      `;
      const words = ["DEVELOPER", "JAVASCRIPT", "BROWSER", "INTERNET", "PROGRAMMING", "DATABASE", "KEYBOARD", "MONITOR", "APPLICATION", "WEBSITE"];
      let curr = "";
      const wBox = el.querySelector('#ws-word');
      const inn = el.querySelector('#ws-in');
      const status = el.querySelector('#ws-status');
      const nextBtn = el.querySelector('#ws-next');

      const next = () => {
        curr = words[Math.floor(Math.random()*words.length)];
        let s = curr.split('').sort(() => Math.random()-0.5).join(' ');
        if(s.replace(/ /g,'') === curr) s = curr.split('').reverse().join(' ');
        wBox.textContent = s;
        inn.value = '';
        inn.disabled = false;
        status.textContent = '';
        nextBtn.style.display = 'none';
        inn.focus();
      };

      const check = () => {
        if(inn.value.trim().toUpperCase() === curr) {
          status.textContent = "Correct! 🎉";
          status.style.color = "var(--accent-warm)";
          inn.disabled = true;
          nextBtn.style.display = 'inline-block';
        } else {
          status.textContent = "Try Again! ❌";
          status.style.color = "#ff5555";
        }
      };

      el.querySelector('#ws-btn').addEventListener('click', check);
      inn.addEventListener('keyup', (e) => { if(e.key==='Enter') check(); });
      nextBtn.addEventListener('click', next);
      
      next();
    }
  },

  // 11. Random Name Generator
  {
    id: 'random-name-gen',
    name: 'Random Name Generator',
    desc: 'Generate perfect random names for pets and characters.',
    icon: '🎲',
    category: 'fun',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io" style="align-items:center; text-align:center;">
          <h3 style="margin-bottom:15px;">Generate a Random Name</h3>
          <div style="display:flex; gap:10px; margin-bottom:20px; flex-wrap:wrap; justify-content:center;">
            <select id="rn-type" class="io-input" style="width:150px; cursor:pointer;">
              <optgroup label="Pets">
                <option value="dog">Dog / Puppy</option>
                <option value="cat">Cat / Kitten</option>
                <option value="bird">Bird / Parrot</option>
                <option value="fish">Fish / Aquatic</option>
              </optgroup>
              <optgroup label="Fantasy">
                <option value="knight">Knight / Warrior</option>
                <option value="wizard">Wizard / Mage</option>
                <option value="elf">Elf / Ranger</option>
              </optgroup>
            </select>
            <button class="cyber-btn" id="rn-btn">Generate</button>
          </div>
          <div class="io-box io-output">
            <div class="output-block" id="rn-out" style="font-size:2rem; font-weight:bold; color:var(--accent-warm);">Click Generate</div>
          </div>
        </div>
      `;

      const lists = {
        dog: ['Buddy', 'Bella', 'Charlie', 'Lucy', 'Max', 'Daisy', 'Cooper', 'Luna', 'Rocky', 'Sadie', 'Duke', 'Zoe'],
        cat: ['Luna', 'Oliver', 'Bella', 'Leo', 'Milo', 'Lily', 'Cleo', 'Simba', 'Loki', 'Nala', 'Jasper', 'Chloe'],
        bird: ['Sunny', 'Kiwi', 'Mango', 'Tiki', 'Coco', 'Rio', 'Apollo', 'Sky', 'Tweety', 'Zazu', 'Pippin', 'Blue'],
        fish: ['Nemo', 'Bubbles', 'Finny', 'Sushi', 'Goldie', 'Splash', 'Marlin', 'Dory', 'Swimmy', 'Squirt'],
        knight: ['Sir Lancelot', 'Arthur', 'Gawain', 'Leonidas', 'Bram', 'Tristan', 'Galahad', 'Boric', 'Hector'],
        wizard: ['Merlin', 'Gandalf', 'Albus', 'Elminster', 'Radagast', 'Thalador', 'Grimbold', 'Zephyr'],
        elf: ['Legolas', 'Elrond', 'Thranduil', 'Galadriel', 'Arwen', 'Tauriel', 'Faelar', 'Sylas']
      };
      const adjectives = {
        dog: ['Good Boy', 'Fuzzy', 'Happy', 'Sleepy', 'Brave', 'Loyal'],
        cat: ['Majestic', 'Sneaky', 'Sleepy', 'Grumpy', 'Fluffy', 'Nimble'],
        knight: ['the Brave', 'the Valiant', 'the Strong', 'the Bold', 'Lionheart'],
        wizard: ['the Wise', 'the Gray', 'the Ancient', 'the Mystic', 'of the North'],
        elf: ['Swift', 'of the Woods', 'the Silent', 'Starborn', 'Moonshadow']
      };

      const btn = el.querySelector('#rn-btn');
      const out = el.querySelector('#rn-out');
      const type = el.querySelector('#rn-type');

      btn.addEventListener('click', () => {
        const t = type.value;
        const nList = lists[t] || lists.dog;
        const aList = adjectives[t];
        
        let name = nList[Math.floor(Math.random() * nList.length)];
        
        // 50% chance to add an adjective/title if available
        if(aList && Math.random() > 0.5) {
          const adj = aList[Math.floor(Math.random() * aList.length)];
          // Put title at the end for knights/wizards/elves, front for pets
          if(['knight','wizard','elf'].includes(t)) name = `${name} ${adj}`;
          else name = `${adj} ${name}`;
        }
        
        out.textContent = name;
      });
    }
  }
);
