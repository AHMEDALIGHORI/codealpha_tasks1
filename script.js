const songList= [
    {
        name: "Pal Pal",
        artist: "Artist 1",
        src:"assets/128-Pal Pal - Afusic 128 Kbps.mp3",
        cover: "assets/3.jpg"
    },
    {
       name: "Main Urra",
        artist: "Uran",
        src:"assets/Main Urra.mp3",
        cover: "assets/2.jpg"
    },
    {
       name: "Maand",
       artist: "Baayan",
       src:"assets/Maand - (Raag.Fm).mp3",
       cover: "assets/1.webp"
    }
    
];

const artistName = document.querySelector(".artist-name");
const musicName = document.querySelector(".song-name");
const filBar = document.querySelector(".fill-bar");
const time = document.querySelector(".time");
const cover = document.querySelector(".cover");
const playBtn = document.querySelector("#play"); // Fixed selector
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
const prog = document.querySelector(".progress-bar");

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener("DOMContentLoaded", () => {
    loadSong(currentSong);
    playBtn.addEventListener("click", togglePlayPause);
    nextBtn.addEventListener("click", nextSong);
    prevBtn.addEventListener("click", prevSong);
    prog.addEventListener("click", seek); // Fixed function name
    song.addEventListener("timeupdate", updateProgress);
    song.addEventListener("ended", nextSong);
});

function loadSong(index) {
    const { name, artist, src, cover: coverUrl } = songList[index]; // Rename to avoid conflict
    artistName.innerText = artist; // Fixed typo
    musicName.innerText = name;
    song.src = src; // Set audio source
    cover.style.backgroundImage = `url('${coverUrl}')`; // Correct background
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        filBar.style.width = `${pos}%`;
        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60); // Fixed variable name
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
currentSong = (currentSong + 1) % songList.length;
playMusic();
}
function prevSong() {
currentSong = (currentSong - 1 + songList.length) % songList.length;
playMusic();

}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');

}

function seek(e) {
    const { offsetX } = e;
    const { clientWidth } = prog;
    const pos = (offsetX / clientWidth) * song.duration;
    song.currentTime = pos;}