const audio = document.getElementById("audio");

const songs = [
    {
        title: "My First Song",
        artist: "Artist Name",
        file: "song1.mp3",
        image: "https://picsum.photos/60?random=1"
    }
];

let currentSong = 0;

function playSong(index) {
    currentSong = index;

    audio.src = songs[index].file;

    document.getElementById("songTitle").textContent =
        songs[index].title;

    document.getElementById("artist").textContent =
        songs[index].artist;

    document.getElementById("playerImage").src =
        songs[index].image;

    audio.play();

    document.getElementById("playBtn").textContent = "⏸";
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        document.getElementById("playBtn").textContent = "⏸";
    } else {
        audio.pause();
        document.getElementById("playBtn").textContent = "▶";
    }
}

function nextSong() {
    currentSong++;
    if (currentSong >= songs.length) {
        currentSong = 0;
    }
    playSong(currentSong);
}

function previousSong() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    playSong(currentSong);
}

audio.addEventListener("timeupdate", () => {
    const progress = document.getElementById("progress");

    if (audio.duration) {
        progress.value =
            (audio.currentTime / audio.duration) * 100;
    }

    document.getElementById("currentTime").textContent =
        formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
    document.getElementById("duration").textContent =
        formatTime(audio.duration);
});

document.getElementById("progress").addEventListener("input", function () {
    audio.currentTime =
        (this.value / 100) * audio.duration;
});

document.getElementById("volume").addEventListener("input", function () {
    audio.volume = this.value;
});

audio.addEventListener("ended", nextSong);

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";

    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    if (secs < 10) {
        secs = "0" + secs;
    }

    return minutes + ":" + secs;
}
