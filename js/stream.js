var playing = false;

const playButton = document.querySelector('#play-button');
function initPlayButton() {
    const song = new Audio(`${document.location.pathname}song.mp3`);
    song.volume = 0.3;
    song.loop = true;
    
    const audioContext = new AudioContext();
    const lowPassFilter = audioContext.createBiquadFilter();
    lowPassFilter.type = 'lowpass';
    lowPassFilter.frequency.value = 100;
    const sourceNode = audioContext.createMediaElementSource(song);
    sourceNode.connect(lowPassFilter);
    lowPassFilter.connect(audioContext.destination);
    playButton.addEventListener('click', () => {
        playing = !playing;
        playButton.classList = `${playing ? 'fa-pause fa-solid' : 'fa-play'} fa-2xl`;
        if (playing) song.play();
        else song.pause();
    });
    document.removeEventListener('click', initPlayButton)
}

document.addEventListener('click', initPlayButton)