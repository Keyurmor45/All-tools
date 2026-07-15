document.addEventListener('DOMContentLoaded', async () => {
  const feed = document.getElementById('news-feed');
  const status = document.getElementById('news-status');

  try {
    status.textContent = 'FETCHING_PACKETS: https://hacker-news.firebaseio.com/v0/topstories';
    
    // Fetch top 30 story IDs
    const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    if (!res.ok) throw new Error('Network response was not ok');
    const ids = await res.json();
    
    status.textContent = 'DECRYPTING_PACKETS: Fetching details...';
    
    // Fetch details for the first 15 stories concurrently
    const topIds = ids.slice(0, 15);
    const storyPromises = topIds.map(id => 
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())
    );
    
    const stories = await Promise.all(storyPromises);
    
    status.textContent = `CONNECTION_ESTABLISHED: ${new Date().toLocaleTimeString()}`;
    
    // Render stories
    feed.innerHTML = stories.map((story, i) => `
      <a href="${story.url || `https://news.ycombinator.com/item?id=${story.id}`}" target="_blank" rel="noopener" class="news-item" style="animation-delay: ${i * 0.05}s">
        <div class="news-score">
          <span class="news-score-val">${story.score}</span>
          <span class="news-score-label">PTS</span>
        </div>
        <div class="news-content">
          <h2 class="news-title">${story.title}</h2>
          <div class="news-meta">
            <span>BY: ${story.by}</span>
            <span>//</span>
            <span>${new Date(story.time * 1000).toLocaleString()}</span>
            <span>//</span>
            <span>${story.descendants || 0} CMTS</span>
          </div>
        </div>
        <div class="news-arrow" aria-hidden="true">↗</div>
      </a>
    `).join('');

  } catch (error) {
    console.error('Error fetching news:', error);
    status.textContent = 'CONNECTION_FAILED';
    feed.innerHTML = `
      <div class="alert alert-error" style="background: var(--accent-red); color: var(--bg); padding: 20px; font-family: var(--font-mono); font-weight: bold;">
        [ERROR] FAILED TO CONNECT TO HACKER NEWS MAINFRAME. <br>
        PLEASE CHECK YOUR CONNECTION AND TRY AGAIN.
      </div>
    `;
  }
});
