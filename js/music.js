/**
 * Picks a random element from the given array
 * @param {Array} arr 
 * @returns 
 */
const pickRandom = (arr) => arr[Math.floor(Math.random()* arr.length)];

const songs = [
  { file: 'so_evil.wav', name: 'demented - so evil' },
  { file: 'soevilspedup.mp3', name: 'demented - so evil (sped up)' },
  { file: 'soevilspedup.mp3', name: 'demented - so evil (sped up)' },
  { file: 'soevilspedup.mp3', name: 'demented - so evil (sped up)' },
  { file: 'soevilspedup.mp3', name: 'demented - so evil (sped up)' },
  { file: 'soevilspedup.mp3', name: 'demented - so evil (sped up)' },
  { file: 'AHH.wav', name: 'demented - AHH' }
  // { file: '1.mp3', name: 'landfill network down' },
  // { file: '2.mp3', name: '♢ N O Ɔ Ǝ ⅄ Ǝ ↻' },
  // { file: '3.mp3', name: '23 – 1 = 222–1 – 1 ᐱᖓᓱᑦ °ordæliœrdæliœrdælie' },
  // { file: '4.mp3', name: 'i can\'t feel my face' },
  // { file: '4.mp3', name: 'i can\'t feel my face' },
  // { file: '4.mp3', name: 'i can\'t feel my face' },
  // { file: '4.mp3', name: 'i can\'t feel my face' }
]

const chosenSong = pickRandom(songs);
const song = new Audio('/audio/' + chosenSong.file);
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

song.addEventListener('play', e => {
  document.querySelector('body').insertAdjacentHTML('afterend', `<song class="full-display">${chosenSong.name}</song>`)
  setTimeout(() => {document.querySelector('song').classList.remove('full-display')}, 15000)
  document.addEventListener('mousedown', () => {
    setTimeout(() => {document.querySelector('song').classList.remove('full-display')}, 1500)
  })
  // for phone
  document.addEventListener('click', () => {
    setTimeout(() => {document.querySelector('song').classList.remove('full-display')}, 1500)
  })
})