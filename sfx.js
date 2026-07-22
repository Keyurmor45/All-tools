/* ================================================================
   Meme Sound Effects Engine (MP3) — with mute support
   ================================================================ */

const MemeEngine = (function() {
  const memeUrls = [
    'https://www.myinstants.com/media/sounds/movie_1.mp3',
    'https://www.myinstants.com/media/sounds/vine-boom.mp3',
    'https://www.myinstants.com/media/sounds/bonk_2.mp3',
    'https://www.myinstants.com/media/sounds/anime-wow-sound-effect.mp3',
    'https://www.myinstants.com/media/sounds/among-us-role-reveal-sound.mp3',
    'https://www.myinstants.com/media/sounds/taco-bell-bong-sfx.mp3',
    'https://www.myinstants.com/media/sounds/roblox-death-sound_1.mp3'
  ];

  const audioPool = memeUrls.map(url => {
    const a = new Audio(url);
    a.volume = 0.6;
    return a;
  });

  // Read mute state from localStorage
  function isMuted() {
    return localStorage.getItem('alltools-muted') === '1';
  }

  return {
    playRandom: function() {
      if (isMuted()) return; // Respect mute setting
      try {
        const index = Math.floor(Math.random() * audioPool.length);
        const a = audioPool[index];
        a.currentTime = 0;
        a.play().catch(() => {});
      } catch (e) {}
    },
    isMuted,
    setMuted: function(val) {
      localStorage.setItem('alltools-muted', val ? '1' : '0');
    }
  };
})();

window.playFunnySound = MemeEngine.playRandom.bind(MemeEngine);
window.MemeEngine = MemeEngine;
