/**
 * Background music controls — starts paused; user presses play to start.
 */
document.addEventListener('DOMContentLoaded', function () {
  const audio = document.getElementById('backgroundMusic');
  const toggleButton = document.getElementById('toggleAudio');
  const volumeSlider = document.getElementById('volumeSlider');
  if (!audio || !toggleButton) return;

  function setIcon(isPlaying) {
    toggleButton.innerHTML = isPlaying
      ? '<i class="bi bi-pause-fill" aria-hidden="true"></i>'
      : '<i class="bi bi-play-fill" aria-hidden="true"></i>';
    toggleButton.setAttribute('aria-label', isPlaying ? 'หยุดเพลง' : 'เล่นเพลง');
  }

  audio.pause();
  audio.muted = false;

  if (volumeSlider) {
    audio.volume = Number(volumeSlider.value) / 100;
    volumeSlider.addEventListener('input', function () {
      audio.volume = this.value / 100;
    });
  }

  setIcon(false);

  toggleButton.addEventListener('click', function () {
    if (audio.paused) {
      audio.muted = false;
      if (volumeSlider) {
        audio.volume = Number(volumeSlider.value) / 100;
      }
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.then(() => setIcon(true)).catch(() => setIcon(false));
      } else {
        setIcon(!audio.paused);
      }
    } else {
      audio.pause();
      setIcon(false);
    }
  });
});
