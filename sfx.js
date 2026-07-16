/* ================================================================
   Meme Sound Effects Engine (MP3)
   ================================================================ */

const MemeEngine = (function() {
  // URLs for popular meme sound effects (hosted on MyInstants)
  const memeUrls = [
    'https://www.myinstants.com/media/sounds/movie_1.mp3', // Bruh
    'https://www.myinstants.com/media/sounds/vine-boom.mp3', // Vine Boom
    'https://www.myinstants.com/media/sounds/bonk_2.mp3', // Bonk
    'https://www.myinstants.com/media/sounds/anime-wow-sound-effect.mp3', // Anime Wow
    'https://www.myinstants.com/media/sounds/among-us-role-reveal-sound.mp3', // Among Us Sus
    'https://www.myinstants.com/media/sounds/taco-bell-bong-sfx.mp3', // Taco Bell Bong
    'https://www.myinstants.com/media/sounds/roblox-death-sound_1.mp3' // Roblox Oof
  ];

  // Pre-fetch some audio objects to eliminate delay on first click
  const audioPool = memeUrls.map(url => {
    const a = new Audio(url);
    a.volume = 0.6; // Don't blow out their eardrums
    return a;
  });

  return {
    playRandom: function() {
      try {
        const index = Math.floor(Math.random() * audioPool.length);
        const a = audioPool[index];
        a.currentTime = 0; // reset to start just in case
        a.play().catch(e => {
          console.warn("Autoplay blocked. User needs to interact with page first.");
        });
      } catch (e) {
        console.error(e);
      }
    }
  };
})();

// Override the old 8-bit player with the Meme Engine
window.playFunnySound = MemeEngine.playRandom;
