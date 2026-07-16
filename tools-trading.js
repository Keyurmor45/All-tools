/* ================================================================
   Trading Tools
   ================================================================ */

function addTradingTools() {
  const t = [];

  // Helper for formatting currency
  function formatMoney(num) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  }

  // 1. PROFIT / LOSS CALCULATOR
  t.push({
    id: 'trading-pnl', category: 'trading', name: 'Profit / Loss Calculator', icon: '💹',
    description: 'Instantly calculate exact PnL and percentage gained or lost on a trade.',
    tags: ['trading', 'pnl', 'profit', 'loss', 'calculator', 'crypto', 'stocks'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          <label>Buy Price ($)</label>
          <input type="number" id="pnl-buy" class="cyber-input" placeholder="e.g. 100" />
          <label>Sell Price ($)</label>
          <input type="number" id="pnl-sell" class="cyber-input" placeholder="e.g. 150" />
          <label>Quantity (Shares/Coins)</label>
          <input type="number" id="pnl-qty" class="cyber-input" placeholder="e.g. 10" />
          <button id="pnl-btn" class="cyber-btn mt-3">Calculate PnL</button>
        </div>
        <div id="pnl-out" style="margin-top:15px; font-family:var(--font-mono); font-size:1.2rem; color:var(--accent);"></div>
      `;
      el.querySelector('#pnl-btn').onclick = () => {
        const buy = parseFloat(el.querySelector('#pnl-buy').value);
        const sell = parseFloat(el.querySelector('#pnl-sell').value);
        const qty = parseFloat(el.querySelector('#pnl-qty').value);
        if (isNaN(buy) || isNaN(sell) || isNaN(qty)) return showToast("Enter valid numbers!");
        
        const cost = buy * qty;
        const revenue = sell * qty;
        const profit = revenue - cost;
        const percent = ((sell - buy) / buy) * 100;
        
        let color = profit >= 0 ? '#00ff00' : '#ff0000';
        el.querySelector('#pnl-out').innerHTML = `
          <span style="color:${color}">Net PnL: ${formatMoney(profit)} (${percent.toFixed(2)}%)</span><br>
          <span style="font-size:0.9rem; color:var(--text-muted)">Total Cost: ${formatMoney(cost)}</span>
        `;
      };
    }
  });

  // 2. POSITION SIZE CALCULATOR
  t.push({
    id: 'trading-pos-size', category: 'trading', name: 'Position Size Calculator', icon: '📏',
    description: 'Calculate exactly how many shares or coins to buy based on your account risk.',
    tags: ['trading', 'position', 'size', 'risk', 'stop', 'loss'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          <label>Account Size ($)</label>
          <input type="number" id="pos-acc" class="cyber-input" placeholder="e.g. 10000" />
          <label>Risk Per Trade (%)</label>
          <input type="number" id="pos-risk" class="cyber-input" placeholder="e.g. 1" />
          <label>Entry Price ($)</label>
          <input type="number" id="pos-entry" class="cyber-input" placeholder="e.g. 50" />
          <label>Stop Loss Price ($)</label>
          <input type="number" id="pos-sl" class="cyber-input" placeholder="e.g. 45" />
          <button id="pos-btn" class="cyber-btn mt-3">Calculate Size</button>
        </div>
        <div id="pos-out" style="margin-top:15px; font-family:var(--font-mono); font-size:1.1rem; color:var(--accent);"></div>
      `;
      el.querySelector('#pos-btn').onclick = () => {
        const acc = parseFloat(el.querySelector('#pos-acc').value);
        const risk = parseFloat(el.querySelector('#pos-risk').value);
        const entry = parseFloat(el.querySelector('#pos-entry').value);
        const sl = parseFloat(el.querySelector('#pos-sl').value);
        if (isNaN(acc) || isNaN(risk) || isNaN(entry) || isNaN(sl)) return showToast("Enter valid numbers!");
        if (entry === sl) return showToast("Entry and Stop Loss cannot be the same!");
        
        const riskAmt = acc * (risk / 100);
        const riskPerShare = Math.abs(entry - sl);
        const size = riskAmt / riskPerShare;
        const totalCapital = size * entry;
        
        if (totalCapital > acc) {
          el.querySelector('#pos-out').innerHTML = `<span style="color:#ff0000">Warning: Required capital (${formatMoney(totalCapital)}) exceeds account size. You must use leverage!</span>`;
        } else {
          el.querySelector('#pos-out').innerHTML = `
            Position Size: <strong>${size.toFixed(4)} Units</strong><br>
            Capital Required: ${formatMoney(totalCapital)}<br>
            Amount at Risk: ${formatMoney(riskAmt)}
          `;
        }
      };
    }
  });

  // 3. RISK REWARD CALCULATOR
  t.push({
    id: 'trading-rr-ratio', category: 'trading', name: 'Risk/Reward Ratio', icon: '⚖️',
    description: 'Check if your trade setup meets the standard 1:2 or 1:3 R/R ratio.',
    tags: ['trading', 'risk', 'reward', 'ratio', 'target', 'stop'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          <label>Entry Price</label>
          <input type="number" id="rr-entry" class="cyber-input" />
          <label>Stop Loss</label>
          <input type="number" id="rr-sl" class="cyber-input" />
          <label>Take Profit (Target)</label>
          <input type="number" id="rr-tp" class="cyber-input" />
          <button id="rr-btn" class="cyber-btn mt-3">Calculate Ratio</button>
        </div>
        <div id="rr-out" style="margin-top:15px; font-family:var(--font-mono); font-size:1.1rem; color:var(--accent);"></div>
      `;
      el.querySelector('#rr-btn').onclick = () => {
        const entry = parseFloat(el.querySelector('#rr-entry').value);
        const sl = parseFloat(el.querySelector('#rr-sl').value);
        const tp = parseFloat(el.querySelector('#rr-tp').value);
        if (isNaN(entry) || isNaN(sl) || isNaN(tp)) return showToast("Enter all fields!");
        
        const risk = Math.abs(entry - sl);
        const reward = Math.abs(tp - entry);
        if (risk === 0) return showToast("Stop loss cannot equal entry!");
        
        const ratio = reward / risk;
        let color = ratio >= 2 ? '#00ff00' : (ratio >= 1 ? '#ffff00' : '#ff0000');
        
        el.querySelector('#rr-out').innerHTML = `
          Risk / Reward Ratio: <strong style="color:${color}">1 : ${ratio.toFixed(2)}</strong><br>
          <span style="font-size:0.9rem; color:var(--text-muted)">
            Risking ${formatMoney(risk)} per unit to make ${formatMoney(reward)}.
          </span>
        `;
      };
    }
  });

  // 4. LEVERAGE CALCULATOR
  t.push({
    id: 'trading-leverage', category: 'trading', name: 'Leverage & Margin', icon: '🚀',
    description: 'Calculate liquidation price and required margin for leveraged trades.',
    tags: ['trading', 'leverage', 'margin', 'liquidation', 'futures'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          <label>Position Size (in USD or Quote Currency)</label>
          <input type="number" id="lev-pos" class="cyber-input" placeholder="e.g. 10000" />
          <label>Leverage (x)</label>
          <input type="number" id="lev-x" class="cyber-input" placeholder="e.g. 10" />
          <label>Entry Price</label>
          <input type="number" id="lev-entry" class="cyber-input" placeholder="e.g. 50000" />
          <label>Direction</label>
          <select id="lev-dir" class="cyber-input">
            <option value="long">LONG (Buy)</option>
            <option value="short">SHORT (Sell)</option>
          </select>
          <button id="lev-btn" class="cyber-btn mt-3">Calculate Margin</button>
        </div>
        <div id="lev-out" style="margin-top:15px; font-family:var(--font-mono); font-size:1.1rem; color:var(--accent);"></div>
      `;
      el.querySelector('#lev-btn').onclick = () => {
        const pos = parseFloat(el.querySelector('#lev-pos').value);
        const lev = parseFloat(el.querySelector('#lev-x').value);
        const entry = parseFloat(el.querySelector('#lev-entry').value);
        const dir = el.querySelector('#lev-dir').value;
        if (isNaN(pos) || isNaN(lev) || isNaN(entry)) return showToast("Enter all fields!");
        
        const margin = pos / lev;
        // Basic isolated liquidation approx: Entry - (Entry / Leverage) for Long
        let liq;
        if (dir === 'long') liq = entry - (entry / lev);
        else liq = entry + (entry / lev);
        
        // Prevent negative liquidation prices
        if (liq < 0) liq = 0;
        
        el.querySelector('#lev-out').innerHTML = `
          Required Margin: <strong>${formatMoney(margin)}</strong><br>
          Est. Liquidation Price: <strong style="color:#ff0000">${formatMoney(liq)}</strong>
        `;
      };
    }
  });

  // 5. FIBONACCI RETRACEMENT
  t.push({
    id: 'trading-fibonacci', category: 'trading', name: 'Fibonacci Retracement', icon: '🕸️',
    description: 'Instantly calculate key Fibonacci support/resistance levels from a swing high and low.',
    tags: ['trading', 'fibonacci', 'levels', 'support', 'resistance'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          <label>Swing High Price</label>
          <input type="number" id="fib-high" class="cyber-input" />
          <label>Swing Low Price</label>
          <input type="number" id="fib-low" class="cyber-input" />
          <label>Trend</label>
          <select id="fib-trend" class="cyber-input">
            <option value="up">Uptrend (Finding Support)</option>
            <option value="down">Downtrend (Finding Resistance)</option>
          </select>
          <button id="fib-btn" class="cyber-btn mt-3">Get Levels</button>
        </div>
        <div id="fib-out" style="margin-top:15px; font-family:var(--font-mono); font-size:1rem; color:var(--text);"></div>
      `;
      el.querySelector('#fib-btn').onclick = () => {
        const h = parseFloat(el.querySelector('#fib-high').value);
        const l = parseFloat(el.querySelector('#fib-low').value);
        const trend = el.querySelector('#fib-trend').value;
        if (isNaN(h) || isNaN(l)) return showToast("Enter High and Low!");
        if (l >= h) return showToast("High must be greater than Low!");
        
        const diff = h - l;
        const levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
        
        let out = '';
        levels.forEach(lv => {
           let val;
           if (trend === 'up') val = h - (diff * lv);
           else val = l + (diff * lv);
           
           let color = 'var(--text)';
           if(lv === 0.618) color = '#00ff00'; // Golden ratio
           else if(lv === 0.5) color = '#ffff00';
           
           out += `<div style="display:flex; justify-content:space-between; color:${color}; padding:2px 0;">
             <span>${(lv*100).toFixed(1)}%</span>
             <span>${formatMoney(val)}</span>
           </div>`;
        });
        
        el.querySelector('#fib-out').innerHTML = `
          <div style="margin-bottom:10px; color:var(--text-muted); font-size:0.9rem;">Green = Golden Ratio</div>
          ${out}
        `;
      };
    }
  });

  // 6. COMPOUND GROWTH
  t.push({
    id: 'trading-compound', category: 'trading', name: 'Compound Growth', icon: '📈',
    description: 'See how a consistent daily trading gain compounds your account over time.',
    tags: ['trading', 'compound', 'interest', 'growth', 'daily'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          <label>Starting Balance ($)</label>
          <input type="number" id="comp-start" class="cyber-input" placeholder="e.g. 1000" />
          <label>Daily Goal (%)</label>
          <input type="number" id="comp-perc" class="cyber-input" placeholder="e.g. 1" />
          <label>Number of Days</label>
          <input type="number" id="comp-days" class="cyber-input" placeholder="e.g. 365" />
          <button id="comp-btn" class="cyber-btn mt-3">Calculate Growth</button>
        </div>
        <div id="comp-out" style="margin-top:15px; font-family:var(--font-mono); font-size:1.1rem; color:var(--accent);"></div>
      `;
      el.querySelector('#comp-btn').onclick = () => {
        const start = parseFloat(el.querySelector('#comp-start').value);
        const perc = parseFloat(el.querySelector('#comp-perc').value);
        const days = parseInt(el.querySelector('#comp-days').value);
        if (isNaN(start) || isNaN(perc) || isNaN(days)) return showToast("Enter all fields!");
        
        const finalBal = start * Math.pow(1 + (perc/100), days);
        const net = finalBal - start;
        
        el.querySelector('#comp-out').innerHTML = `
          Final Balance: <strong style="color:#00ff00">${formatMoney(finalBal)}</strong><br>
          Total Profit: ${formatMoney(net)}<br>
          Multiplier: ${(finalBal/start).toFixed(2)}x
        `;
      };
    }
  });

  window.TOOLS.push(...t);
}

// Auto-register tools if loaded
if(window.TOOLS) addTradingTools();
