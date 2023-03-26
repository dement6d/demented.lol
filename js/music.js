const song = new Audio('/audio/landfill-network_down.mp3');
song.volume = 0.5;
song.loop = true;

song.play().catch(() => {
  document.addEventListener('keypress', () => {
    song.play()
  })
  document.addEventListener('mouseover', () => {
    song.play()
  })
  document.addEventListener('click', () => {
    song.play()
  })
})