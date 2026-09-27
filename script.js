const audio = document.getElementById("audio");

const songs = [
    {
        title: "My First Song",
        artist: "Artist Name",
        file: "song1.mp3",
        image: "https://picsum.photos/60?random=1"
    },

    {
        title: "Be Intehaan",
        artist: "Atif Aslam",
        file: "song2.mp3",
        image: "https://picsum.photos/60?random=2"
    },

    {
        title: "Darkhast X Monsoon Mashup",
        artist: "Artist Name",
        file: "song3.mp3",
        image: "https://picsum.photos/60?random=3"
    }
];

let currentSong = 0;


// PLAY SONG
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


// PLAY / PAUSE
function togglePlay() {

    if (audio.paused) {

        audio.play();

        document.getElementById("playBtn").textContent = "⏸";

    } else {

        audio.pause();

        document.getElementById("playBtn").textContent = "▶";

    }
}


// NEXT SONG
function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    playSong(currentSong);
}


// PREVIOUS SONG
function previousSong() {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    playSong(currentSong);
}


// UPDATE PROGRESS
audio.addEventListener("timeupdate", function () {

    const progress =
        document.getElementById("progress");

    if (audio.duration) {

        progress.value =
            (audio.currentTime / audio.duration) * 100;

    }

    document.getElementById("currentTime").textContent =
        formatTime(audio.currentTime);

});


// LOAD DURATION
audio.addEventListener("loadedmetadata", function () {

    document.getElementById("duration").textContent =
        formatTime(audio.duration);

});


// PROGRESS BAR
document.getElementById("progress").addEventListener(
    "input",
    function () {

        if (audio.duration) {

            audio.currentTime =
                (this.value / 100) * audio.duration;

        }

    }
);


// VOLUME
document.getElementById("volume").addEventListener(
    "input",
    function () {

        audio.volume = this.value;

    }
);


// SONG ENDED
audio.addEventListener("ended", function () {

    nextSong();

});


// TIME FORMAT
function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    let minutes =
        Math.floor(seconds / 60);

    let secs =
        Math.floor(seconds % 60);

    if (secs < 10) {
        secs = "0" + secs;
    }

    return minutes + ":" + secs;
}
