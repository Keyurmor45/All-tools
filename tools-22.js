// Helper for Chrome's built-in AI (Gemini Nano)
async function runChromeAI(instruction, inputText, onProgress) {
  if (!window.ai) {
    throw new Error('Chrome Built-in AI is not enabled. Go to <b>chrome://flags/#prompt-api-for-gemini-nano</b>, set it to "Enabled", and restart your browser.');
  }
  
  let session;
  try {
    // New API (window.ai.languageModel)
    if (window.ai.languageModel && typeof window.ai.languageModel.create === 'function') {
      const cap = await window.ai.languageModel.capabilities();
      if (cap.available === 'no') throw new Error('AI is not available on this device.');
      session = await window.ai.languageModel.create({ systemPrompt: instruction });
    } 
    // Old API (window.ai.createTextSession)
    else if (typeof window.ai.createTextSession === 'function') {
      session = await window.ai.createTextSession();
    } else {
      throw new Error('Your browser version does not support the Prompt API. Update Chrome to the latest version.');
    }

    const fullPrompt = session.systemPrompt ? inputText : `${instruction}\n\n${inputText}`;
    
    // Support streaming if available
    if (typeof session.promptStreaming === 'function') {
      const stream = await session.promptStreaming(fullPrompt);
      let fullResponse = '';
      for await (const chunk of stream) {
         fullResponse = chunk;
         if(onProgress) onProgress(fullResponse);
      }
      session.destroy();
      return fullResponse;
    } else {
      const response = await session.prompt(fullPrompt);
      session.destroy();
      return response;
    }
  } catch (err) {
    if (session && typeof session.destroy === 'function') session.destroy();
    console.error(err);
    if(err.message.includes('not enabled') || err.message.includes('supported')) throw err;
    throw new Error('AI engine failed to process the request. It might be downloading the model in the background. Check chrome://components.');
  }
}

function buildAIToolUI(el, labelText, placeholderText, btnText, processFunc) {
  el.innerHTML = `
    <div class="tool-io">
      <div style="background:var(--bg-hover); padding:10px; border-radius:4px; margin-bottom:15px; font-size:0.9rem; display:flex; align-items:center; gap:10px;">
        <span style="font-size:1.5rem;">🤖</span>
        <span><b>100% Private Local AI:</b> This tool uses Google Chrome's built-in AI. Data never leaves your device!</span>
      </div>
      <label class="tool-label">${labelText}</label>
      <textarea id="ai-input" class="tool-textarea" placeholder="${placeholderText}" style="height:150px;"></textarea>
      
      <div id="ai-controls" style="margin-top:10px; margin-bottom:15px;"></div>
      
      <button class="cyber-btn" id="ai-btn" style="width:100%;">${btnText}</button>
      
      <div id="ai-error" style="display:none; color:var(--accent-red); margin-top:15px; padding:10px; background:rgba(255,0,0,0.1); border-radius:4px;"></div>
      
      <div class="tool-section" style="margin-top:20px;">
        <label class="tool-label">Result</label>
        <div id="ai-output" class="tool-output" style="min-height:100px; white-space:pre-wrap; font-family:var(--font-body);"></div>
      </div>
    </div>
  `;
  
  const btn = el.querySelector('#ai-btn');
  const input = el.querySelector('#ai-input');
  const output = el.querySelector('#ai-output');
  const errorBox = el.querySelector('#ai-error');
  const controls = el.querySelector('#ai-controls');

  btn.addEventListener('click', async () => {
    const val = input.value.trim();
    if(!val) return;
    
    btn.textContent = 'Processing...';
    btn.disabled = true;
    errorBox.style.display = 'none';
    output.textContent = 'Thinking...';
    
    try {
      await processFunc(val, output, controls);
    } catch(err) {
      errorBox.innerHTML = err.message;
      errorBox.style.display = 'block';
      output.textContent = '';
    } finally {
      btn.textContent = btnText;
      btn.disabled = false;
    }
  });

  return { input, output, controls, errorBox, btn };
}

window.TOOLS.push(
  // 1. Text Summarizer
  {
    id: 'ai-summarize',
    name: 'AI Text Summarizer',
    desc: 'Instantly summarize long articles into bullet points locally using built-in AI.',
    icon: '📝',
    category: 'ai',
    setup(el) {
      buildAIToolUI(el, 'Paste long article or text:', 'Enter text to summarize...', 'Summarize Text', async (text, output) => {
        const instruction = "You are an expert summarizer. Summarize the following text into 3-5 concise bullet points. Be extremely direct.";
        const result = await runChromeAI(instruction, text, (chunk) => { output.textContent = chunk; });
        output.textContent = result;
      });
    }
  },

  // 2. Grammar Fixer
  {
    id: 'ai-grammar',
    name: 'AI Grammar Fixer',
    desc: 'Fix spelling, grammar, and sentence flow privately on your device.',
    icon: '✍️',
    category: 'ai',
    setup(el) {
      buildAIToolUI(el, 'Paste text with errors:', 'i am writing this badly and need fixin', 'Fix Grammar', async (text, output) => {
        const instruction = "You are a professional editor. Fix all spelling and grammar errors in the following text. Improve sentence flow. Output ONLY the corrected text, nothing else.";
        const result = await runChromeAI(instruction, text, (chunk) => { output.textContent = chunk; });
        output.textContent = result;
      });
    }
  },

  // 3. Tone Rewriter
  {
    id: 'ai-rewrite',
    name: 'AI Tone Rewriter',
    desc: 'Rewrite emails or paragraphs to sound Professional, Casual, or Persuasive.',
    icon: '🎭',
    category: 'ai',
    setup(el) {
      const { controls } = buildAIToolUI(el, 'Text to rewrite:', 'Hey man, I need that report by tomorrow.', 'Rewrite Text', async (text, output, ctrl) => {
        const tone = ctrl.querySelector('#tone-select').value;
        const instruction = `You are an expert copywriter. Rewrite the following text to have a ${tone} tone. Output ONLY the rewritten text, without quotes or conversational filler.`;
        const result = await runChromeAI(instruction, text, (chunk) => { output.textContent = chunk; });
        output.textContent = result;
      });
      controls.innerHTML = `
        <select id="tone-select" class="io-input" style="padding:8px;">
          <option value="highly professional and corporate">Professional</option>
          <option value="casual and friendly">Casual</option>
          <option value="highly persuasive and marketing-focused">Persuasive</option>
          <option value="academic and scholarly">Academic</option>
        </select>
      `;
    }
  },

  // 4. Keyword Extractor
  {
    id: 'ai-keywords',
    name: 'AI Keyword Extractor',
    desc: 'Pull the most important SEO keywords out of an article automatically.',
    icon: '🔑',
    category: 'ai',
    setup(el) {
      buildAIToolUI(el, 'Paste article or text:', '...', 'Extract Keywords', async (text, output) => {
        const instruction = "Extract the 5 to 10 most important SEO keywords or phrases from this text. Output them as a comma-separated list.";
        const result = await runChromeAI(instruction, text, (chunk) => { output.textContent = chunk; });
        output.textContent = result;
      });
    }
  },

  // 5. Translator
  {
    id: 'ai-translate',
    name: 'AI Language Translator',
    desc: 'Context-aware translation powered by Gemini Nano.',
    icon: '💬',
    category: 'ai',
    setup(el) {
      const { controls } = buildAIToolUI(el, 'Text to translate:', 'Hello world', 'Translate', async (text, output, ctrl) => {
        const lang = ctrl.querySelector('#lang-select').value;
        const instruction = `Translate the following text into ${lang}. Output ONLY the translated text.`;
        const result = await runChromeAI(instruction, text, (chunk) => { output.textContent = chunk; });
        output.textContent = result;
      });
      controls.innerHTML = `
        <select id="lang-select" class="io-input" style="padding:8px;">
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Japanese">Japanese</option>
          <option value="Hindi">Hindi</option>
          <option value="Chinese (Simplified)">Chinese (Simplified)</option>
        </select>
      `;
    }
  },

  // 6. Code Explainer
  {
    id: 'ai-code',
    name: 'AI Code Explainer',
    desc: 'Paste a confusing chunk of code and let AI explain exactly what it does.',
    icon: '💻',
    category: 'ai',
    setup(el) {
      buildAIToolUI(el, 'Paste code snippet:', 'function foo() { ... }', 'Explain Code', async (text, output) => {
        const instruction = "You are a senior developer. Explain exactly what the following code snippet does in plain English. Keep it concise but accurate.";
        const result = await runChromeAI(instruction, text, (chunk) => { output.textContent = chunk; });
        output.textContent = result;
      });
    }
  }
);
