const fs = require('fs');
const path = require('path');

const directory = __dirname;
const htmlFiles = fs.readdirSync(directory).filter(f => f.endsWith('.html'));

const privacyTermsContactSnippet = `<a href="privacy.html">Privacy</a><span class="dot">·</span>
        <a href="terms.html">Terms</a><span class="dot">·</span>
        <a href="contact.html">Contact</a>`;

const fullFooterTemplate = `
  <!-- Footer -->
  <footer class="footer" role="contentinfo">
    <div class="footer-content">
      <div class="footer-top">
        <div class="footer-logo" aria-label="AllTools">
          <div class="logo-icon" aria-hidden="true">✷</div>
          <span class="logo-text">[ ALL*TOOLS ]</span>
        </div>
        <div class="footer-social">
          <a href="https://www.reddit.com/user/keyurmor45" target="_blank" rel="noopener" class="footer-social-link" aria-label="Reddit profile">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
            Reddit
          </a>
        </div>
      </div>
      <p class="footer-tagline">500+ tools, no signup required. Everything runs in your browser. Your data never leaves your device.</p>
      <div class="footer-links">
        <a href="privacy.html">Privacy</a><span class="dot">·</span>
        <a href="terms.html">Terms</a><span class="dot">·</span>
        <a href="contact.html">Contact</a><span class="dot">·</span>
        <a href="about.html">About</a><span class="dot">·</span>
        <a href="guestbook.html">Wall</a><span class="dot">·</span>
        <a href="index.html">Tools</a>
      </div>
      <p class="footer-credits">© 2026 AllTools · Made with ❤️ · No data sent to any server · All tools run locally</p>
    </div>
  </footer>
`;

htmlFiles.forEach(file => {
  const filePath = path.join(directory, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already contains privacy.html link
  if (content.includes('href="privacy.html"')) {
    console.log(`Skipping ${file} - already updated.`);
    return;
  }

  // If footer-links div exists, inject privacy/terms/contact links at beginning of footer-links
  if (content.includes('<div class="footer-links">')) {
    content = content.replace(
      '<div class="footer-links">',
      `<div class="footer-links">\n        <a href="privacy.html">Privacy</a><span class="dot">·</span>\n        <a href="terms.html">Terms</a><span class="dot">·</span>\n        <a href="contact.html">Contact</a><span class="dot">·</span>`
    );
    // Remove old hash links if present (like about.html#who-we-are)
    content = content.replace(/<a href="about\.html#who-we-are"[^>]*>Privacy Policy<\/a><span class="dot">·<\/span>\s*/gi, '');
    content = content.replace(/<a href="about\.html#our-philosophy"[^>]*>Terms of Service<\/a><span class="dot">·<\/span>\s*/gi, '');
    content = content.replace(/<a href="about\.html#faq"[^>]*>Contact Us<\/a><span class="dot">·<\/span>\s*/gi, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated footer-links in ${file}`);
  } else if (content.includes('</main>')) {
    // If no footer exists, insert footer template right after </main>
    content = content.replace('</main>', `</main>\n${fullFooterTemplate}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Inserted footer in ${file}`);
  }
});
