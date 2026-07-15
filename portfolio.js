const inputs = {
  name: document.getElementById('p-name'),
  tagline: document.getElementById('p-tagline'),
  bio: document.getElementById('p-bio'),
  github: document.getElementById('p-github'),
  twitter: document.getElementById('p-twitter'),
  website: document.getElementById('p-website'),
  color: document.getElementById('p-color')
};

const iframe = document.getElementById('preview-iframe');
const btnDownload = document.getElementById('btn-download');

function generateHTML() {
  const name = inputs.name.value || 'HACKER_99';
  const tagline = inputs.tagline.value || 'SYSADMIN // DESIGNER';
  const bio = inputs.bio.value || 'Building the open web. Avoiding sunlight. Coffee addict.';
  const color = inputs.color.value || '#ccff00';
  
  const github = inputs.github.value ? `<a href="${inputs.github.value}" target="_blank" class="link-btn">[ GITHUB ]</a>` : '';
  const twitter = inputs.twitter.value ? `<a href="${inputs.twitter.value}" target="_blank" class="link-btn">[ TWITTER ]</a>` : '';
  const website = inputs.website.value ? `<a href="${inputs.website.value}" target="_blank" class="link-btn">[ WEBSITE ]</a>` : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} | Link in Bio</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&family=JetBrains+Mono&display=swap');
    
    :root {
      --bg: #000000;
      --text: #ffffff;
      --accent: ${color};
    }
    
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'JetBrains Mono', monospace;
      margin: 0; padding: 0;
      display: flex; justify-content: center; align-items: center;
      min-height: 100vh;
      overflow-x: hidden;
      background-image: radial-gradient(circle at center, rgba(204,255,0,0.05) 0%, transparent 70%);
    }
    
    .container {
      width: 100%; max-width: 500px;
      padding: 40px 20px;
      display: flex; flex-direction: column; align-items: center;
      text-align: center;
    }
    
    .avatar {
      width: 120px; height: 120px;
      border: 3px solid var(--accent);
      border-radius: 50%;
      display: flex; justify-content: center; align-items: center;
      font-family: 'Syncopate', sans-serif;
      font-size: 3rem;
      background: rgba(255,255,255,0.05);
      margin-bottom: 20px;
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
    }
    
    h1 {
      font-family: 'Syncopate', sans-serif;
      text-transform: uppercase;
      font-size: 2rem;
      margin: 0 0 5px 0;
      text-shadow: 2px 2px 0 var(--accent);
    }
    
    .tagline {
      color: var(--accent);
      font-size: 0.9rem;
      letter-spacing: 2px;
      margin-bottom: 20px;
      text-transform: uppercase;
    }
    
    .bio {
      font-size: 0.95rem;
      line-height: 1.6;
      color: #aaaaaa;
      margin-bottom: 40px;
    }
    
    .links {
      display: flex; flex-direction: column; gap: 15px; width: 100%;
    }
    
    .link-btn {
      display: block; width: 100%; box-sizing: border-box;
      background: transparent;
      border: 2px solid var(--accent);
      color: var(--text);
      padding: 15px;
      text-decoration: none;
      font-family: 'Syncopate', sans-serif;
      font-size: 1rem;
      transition: all 0.2s;
    }
    
    .link-btn:hover {
      background: var(--accent);
      color: var(--bg);
      transform: translateX(10px);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="avatar">✷</div>
    <h1>${name}</h1>
    <div class="tagline">${tagline}</div>
    <div class="bio">${bio}</div>
    <div class="links">
      ${github}
      ${twitter}
      ${website}
    </div>
  </div>
</body>
</html>
  `.trim();
}

function updatePreview() {
  const html = generateHTML();
  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();
}

Object.values(inputs).forEach(input => {
  input.addEventListener('input', updatePreview);
});

btnDownload.addEventListener('click', () => {
  const html = generateHTML();
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${inputs.name.value.replace(/\s+/g, '_').toLowerCase() || 'hacker'}_portfolio.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

// Initial Render
updatePreview();
