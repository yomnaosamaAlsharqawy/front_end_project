// Global variable for the volume
var v = 5;

// Make the code run only after document loaded
document.addEventListener('DOMContentLoaded', () => {

    const video = document.querySelector('#video');

    // Set default settings 
    video.volume = .5; 

    if (localStorage[`video${data.meta.id}`]) {
        video.currentTime = localStorage[`video${data.meta.id}`] 
    } else {
        video.currentTime = 0
    }

    loadVideo(video, data.sources);

    loadMeta(data.meta);   
    
    // Keyboard event listeners
    document.addEventListener('keyup', (e) => {
        if(e.key==' '){
            playPause();
        } else if(e.key=='ArrowRight') {
            forwardTen();
        } else if(e.key=='ArrowLeft') {
            backwardTen();
        } else if(e.key=='ArrowUp') {
            volumeUp();
        } else if(e.key=='ArrowDown') {
            volumeDown();
        }
    });

    window.addEventListener('resize', handleTimeupdate)

    document.querySelector('.customized-controls').addEventListener('click', () => {
        playPause();
    });
    
});

// Append video sources 
function loadVideo(videoEl, sources) {
    sources.forEach((src) => {
        const source = document.createElement('source');
        source.setAttribute('src', src[0]);
        source.setAttribute('type', src[1]);
        videoEl.appendChild(source);
    });
} 

// load meta data in the UI like title / credits
function loadMeta(meta) {
    document.querySelector('#age').innerHTML = meta.age;
    document.querySelector('#cats').innerHTML = meta.cats.join(', ');
    document.querySelector('#title').innerHTML = meta.title;
}

// Play/Pause
function playPause() {
    if (video.paused) {
        video.play();
        document.querySelector('#playPauseBtn img').setAttribute('src', '../icons/pause.svg');
    }
    else {
        video.pause();
        document.querySelector('#playPauseBtn img').setAttribute('src', '../icons/play.svg');
    }
}

// Forward 10 seconds
function forwardTen() {
    video.currentTime += 10;
} 

// Backward 10 seconds
function backwardTen() {
    video.currentTime -= 10;
} 

// Volume up 1/10 at a a time
function volumeUp() {
    if (v < 10) v++;
    setVolume(v);
}

// Volume down 1/10 at a time
function volumeDown() {   
    if (v > 0) v--;
    setVolume(v); 
}

// Set volume equal to value of the range
function volumeEqual(e) {
    v = e.target.value;
    setVolume(v);
}

// Mute / Unmute
function muteUnmute() {
    if (video.volume !== 0) {
        setVolume(0);
    }
    else {
        setVolume(v);
    } 
}

// set volume from mute button
function setVolume(v) {
    video.volume = v/10;
    console.log('Volume', video.volume);
}

// full screen
function toggleFullScreen() {
    const player = document.querySelector('#player');
    const fullScrIcon = document.querySelector('#fullScreenBtn').childNodes[0];
    if (!document.fullscreenElement) {
        player.requestFullscreen();
        fullScrIcon.setAttribute('src', 'static/icons/windowed.svg')
        
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            fullScrIcon.setAttribute('src', 'static/icons/fullscreen.svg')
        }
    }
}

// Control Speed 
function speedEqual(x) {
    video.playbackRate = x;
}

function doNothing() {
    return false;
}


function handleSeekbarClick(e){
    const whereToPercent = e.offsetX / seekbar.clientWidth;
    video.currentTime = video.duration * whereToPercent;
}


function handleTimeupdate() {
    const subtitles = document.querySelector('#subtitles');
    const seekbar = document.querySelector('#seekbar');
    const seekbarUpper = document.querySelector('#seekbarUpper');
    const seekbarThumb = document.querySelector('#seekbarThumb');
    const seekbarRemainingTime = document.querySelector('#seekbarRemainingTime');

    localStorage[`video${data.meta.id}`] = video.currentTime;

    // handle subtitles
    let sub = subtitlesArr.filter( item =>
            video.currentTime >= item.start/1000 &&
            video.currentTime <= item.end/1000          // python script convert to ms
    );

    if (sub.length > 0) {
        subtitles.innerHTML = sub[0].content;
    }

    // sync seekbar and thumb with current time
    const x = (video.currentTime / video.duration) * (seekbar.clientWidth);
    seekbarUpper.style.width = `${x}px`;
    seekbarThumb.style.left = `${x}px`;

    // time left 
    let totalSeconds = video.duration - video.currentTime;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
    seekbarRemainingTime.innerHTML = `${hours > 0 ? hours + ':' : ''} ${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
}

function handleVolumechange() {

    const vol = video.volume * 10;
    const volIcon = document.querySelector('#volumeIcon');

    // volumeRange.value = vol; // set slider percentage here

    if(vol === 0) {
        volIcon.setAttribute('src', 'static/icons/volumeMuted.svg')
    } else if(vol < 4) {        
        volIcon.setAttribute('src', 'static/icons/volumeLow.svg')
    } else if(vol < 8) {        
        volIcon.setAttribute('src', 'static/icons/volumeMedium.svg')
    } else {
        volIcon.setAttribute('src', 'static/icons/volumeMax.svg')
    }    
}


console.log('Player script is loaded.')
