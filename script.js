/* =========================================================
   ☕ CAFE BEATS - MUSIC PLAYER
========================================================= */


/* =========================================================
   🔥 FIREBASE
========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyDFdJAqe-g1EXo5qPYpLkoXd23xVrt78S0",
    authDomain: "cafe-beats-6ba81.firebaseapp.com",
    projectId: "cafe-beats-6ba81",
    storageBucket: "cafe-beats-6ba81.firebasestorage.app",
    messagingSenderId: "375478395425",
    appId: "1:375478395425:web:9ce597e11cfd5c212ef960",
    measurementId: "G-WTCQGJ5F24"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();


/* =========================================================
   🎵 SONG LIST
========================================================= */

const songs = [

    { title: "Be Intehaan", artist: "Atif Aslam", file: "song2.mp3" },

    { title: "Darkhast X Monsoon Mashup", artist: "Artist Name", file: "song3.mp3" },

    { title: "Woh Lamhe", artist: "Atif Aslam", file: "song4.mp3" },

    { title: "Jenna Jenna", artist: "Artist 5", file: "song5.mp3" },

    { title: "Pehli Dafa", artist: "Artist 6", file: "song6.mp3" },

    { title: "O Satthi", artist: "Artist 7", file: "song7.mp3" },

    { title: "Shyd Kabhi Na Kah Saku", artist: "Artist 8", file: "song8.mp3" },

    { title: "Song 9", artist: "Artist 9", file: "song9.mp3" },

    { title: "Song 10", artist: "Artist 10", file: "song10.mp3" },

    { title: "Song 11", artist: "Artist 11", file: "song11.mp3" },

    { title: "Song 12", artist: "Artist 12", file: "song12.mp3" },

    { title: "Song 13", artist: "Artist 13", file: "song13.mp3" },

    { title: "Song 14", artist: "Artist 14", file: "song14.mp3" },

    { title: "Song 15", artist: "Artist 15", file: "song15.mp3" },

    { title: "Song 16", artist: "Artist 16", file: "song16.mp3" },

    { title: "Song 17", artist: "Artist 17", file: "song17.mp3" },

    { title: "Song 18", artist: "Artist 18", file: "song18.mp3" },

    { title: "Song 19", artist: "Artist 19", file: "song19.mp3" },

    { title: "Song 20", artist: "Artist 20", file: "song20.mp3" }

];


/* =========================================================
   🎧 PLAYER VARIABLES
========================================================= */

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const playerImage = document.getElementById("playerImage");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");

let currentSongIndex = 0;
let isPlaying = false;


/* =========================================================
   🎵 LOAD SONG
========================================================= */

function loadSong(index) {

    if (!songs[index]) {
        console.error("Song not found:", index);
        return;
    }

    currentSongIndex = index;

    const song = songs[currentSongIndex];

    console.log("Loading:", song.file);

    /*
       ./ makes sure the file is loaded
       from the same GitHub Pages folder.
    */
    audio.src = "./" + song.file;

    songTitle.textContent = song.title;
    artist.textContent = song.artist;

    playerImage.src =
        "https://picsum.photos/60?random=" +
        (currentSongIndex + 2);

    progress.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";

    audio.load();
}


/* =========================================================
   ▶️ PLAY
========================================================= */

function playSong() {

    audio.play()
        .then(function () {

            isPlaying = true;

            playBtn.textContent = "⏸";

            console.log(
                "Playing:",
                songs[currentSongIndex].file
            );

        })
        .catch(function (error) {

            console.error(
                "PLAY ERROR:",
                error
            );

        });
}


/* =========================================================
   ⏸️ PAUSE
========================================================= */

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playBtn.textContent = "▶";
}


/* =========================================================
   ▶️ / ⏸️ TOGGLE
========================================================= */

function togglePlay() {

    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}


/* =========================================================
   ⏭️ NEXT
========================================================= */

function nextSong() {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);

    playSong();
}


/* =========================================================
   ⏮️ PREVIOUS
========================================================= */

function previousSong() {

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    loadSong(currentSongIndex);

    playSong();
}


/* =========================================================
   🎵 AUTO NEXT
========================================================= */

audio.addEventListener(
    "ended",
    function () {
        nextSong();
    }
);


/* =========================================================
   ❌ AUDIO ERROR
========================================================= */

audio.addEventListener(
    "error",
    function () {

        const song = songs[currentSongIndex];

        console.error(
            "================================"
        );

        console.error(
            "❌ AUDIO ERROR"
        );

        console.error(
            "Song:",
            song ? song.title : "Unknown"
        );

        console.error(
            "File:",
            song ? song.file : "Unknown"
        );

        if (audio.error) {

            console.error(
                "Error code:",
                audio.error.code
            );

            /*
              1 = Aborted
              2 = Network error
              3 = Decode error
              4 = Unsupported source
            */

            if (audio.error.code === 4) {

                console.error(
                    "❌ Browser cannot play this audio file."
                );

            }

            if (audio.error.code === 3) {

                console.error(
                    "❌ Audio file may be corrupted or unsupported."
                );

            }

        }

        console.error(
            "================================"
        );

    }
);


/* =========================================================
   ⏱️ METADATA
========================================================= */

audio.addEventListener(
    "loadedmetadata",
    function () {

        if (!isNaN(audio.duration)) {

            duration.textContent =
                formatTime(audio.duration);

            progress.max =
                audio.duration;

        }

    }
);


/* =========================================================
   📊 TIME UPDATE
========================================================= */

audio.addEventListener(
    "timeupdate",
    function () {

        if (!isNaN(audio.duration)) {

            progress.max =
                audio.duration;

            progress.value =
                audio.currentTime;

            currentTime.textContent =
                formatTime(audio.currentTime);

        }

    }
);


/* =========================================================
   🎚️ PROGRESS
========================================================= */

progress.addEventListener(
    "input",
    function () {

        audio.currentTime =
            progress.value;

    }
);


/* =========================================================
   🔊 VOLUME
========================================================= */

volume.addEventListener(
    "input",
    function () {

        audio.volume =
            Number(volume.value);

    }
);

audio.volume = 1;


/* =========================================================
   ⏱️ FORMAT TIME
========================================================= */

function formatTime(seconds) {

    if (
        !seconds ||
        isNaN(seconds)
    ) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        (secs < 10 ? "0" : "") +
        secs
    );
}


/* =========================================================
   🌙 THEME
========================================================= */

function toggleTheme() {

    document.body.classList.toggle(
        "light-theme"
    );

    const button =
        document.getElementById(
            "themeToggle"
        );

    if (
        document.body.classList.contains(
            "light-theme"
        )
    ) {

        button.textContent = "🌙";

    } else {

        button.textContent = "☀️";

    }
}


/* =========================================================
   🕐 LIVE CLOCK
========================================================= */

function updateClock() {

    const clock =
        document.getElementById(
            "liveClock"
        );

    if (!clock) return;

    const now = new Date();

    let hours =
        now.getHours();

    const minutes =
        now.getMinutes();

    const seconds =
        now.getSeconds();

    const ampm =
        hours >= 12
            ? "PM"
            : "AM";

    hours =
        hours % 12 || 12;

    const m =
        minutes < 10
            ? "0" + minutes
            : minutes;

    const s =
        seconds < 10
            ? "0" + seconds
            : seconds;

    clock.textContent =
        `${hours}:${m}:${s} ${ampm}`;
}

setInterval(
    updateClock,
    1000
);

updateClock();


/* =========================================================
   🟢 ONLINE USERS
========================================================= */

const onlineCount =
    document.getElementById(
        "onlineCount"
    );

const userId =
    "user_" +
    Date.now() +
    "_" +
    Math.random()
        .toString(36)
        .substring(2, 9);

const userRef =
    database.ref(
        "onlineUsers/" +
        userId
    );

userRef.set(true);

userRef
    .onDisconnect()
    .remove();

database
    .ref("onlineUsers")
    .on(
        "value",
        function (snapshot) {

            if (onlineCount) {

                onlineCount.textContent =
                    snapshot.numChildren();

            }

        }
    );


/* =========================================================
   😴 SLEEP TIMER
========================================================= */

let sleepTimer = null;

function setSleepTimer() {

    const select =
        document.getElementById(
            "sleepTime"
        );

    const status =
        document.getElementById(
            "sleepStatus"
        );

    if (!select) return;

    const minutes =
        Number(select.value);

    if (sleepTimer) {

        clearTimeout(
            sleepTimer
        );

        sleepTimer = null;
    }

    if (minutes === 0) {

        if (status) {
            status.textContent = "";
        }

        return;
    }

    if (status) {

        status.textContent =
            `⏱️ ${minutes} min`;
    }

    sleepTimer =
        setTimeout(
            function () {

                audio.pause();

                audio.currentTime = 0;

                isPlaying = false;

                if (playBtn) {
                    playBtn.textContent = "▶";
                }

                if (status) {
                    status.textContent =
                        "😴 Music stopped";
                }

                select.value = "0";

                sleepTimer = null;

            },
            minutes * 60 * 1000
        );
}


/* =========================================================
   🌊 MUSIC VISUALIZER
========================================================= */

const canvas =
    document.getElementById(
        "visualizer"
    );

const ctx =
    canvas
        ? canvas.getContext("2d")
        : null;

let analyser = null;
let audioContext = null;
let source = null;


/* =========================================================
   🎧 SETUP VISUALIZER
========================================================= */

function setupVisualizer() {

    if (audioContext) return;

    try {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

        analyser =
            audioContext.createAnalyser();

        analyser.fftSize = 1024;

        analyser.smoothingTimeConstant =
            0.97;

        source =
            audioContext
                .createMediaElementSource(
                    audio
                );

        source.connect(
            analyser
        );

        analyser.connect(
            audioContext.destination
        );

    } catch (error) {

        console.log(
            "Visualizer error:",
            error
        );

    }
}


/* =========================================================
   📐 RESIZE
========================================================= */

function resizeCanvas() {

    if (!canvas || !ctx) return;

    const rect =
        canvas.getBoundingClientRect();

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        rect.width * dpr;

    canvas.height =
        rect.height * dpr;

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );
}

window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


/* =========================================================
   🌊 DRAW WAVE
========================================================= */

function drawVisualizer() {

    requestAnimationFrame(
        drawVisualizer
    );

    if (!canvas || !ctx) return;

    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    if (!analyser) return;

    const data =
        new Uint8Array(
            analyser.frequencyBinCount
        );

    analyser.getByteTimeDomainData(
        data
    );

    const points = 70;

    const step =
        data.length / points;

    const values = [];

    for (
        let i = 0;
        i < points;
        i++
    ) {

        values.push(
            data[
                Math.floor(
                    i * step
                )
            ]
        );

    }

    ctx.beginPath();

    const centerY =
        height / 2;

    const amplitude =
        height * 0.32;

    const xStep =
        width /
        (points - 1);

    for (
        let i = 0;
        i < points;
        i++
    ) {

        const normalized =
            (values[i] - 128) /
            128;

        const x =
            i * xStep;

        const y =
            centerY +
            normalized *
            amplitude;

        if (i === 0) {

            ctx.moveTo(
                x,
                y
            );

        } else {

            const prevX =
                (i - 1) *
                xStep;

            const prevY =
                centerY +
                (
                    (
                        values[i - 1] -
                        128
                    ) /
                    128
                ) *
                amplitude;

            const controlX =
                (prevX + x) / 2;

            ctx.quadraticCurveTo(
                controlX,
                prevY,
                x,
                y
            );
        }
    }

    ctx.lineWidth = 2.5;

    ctx.strokeStyle =
        "rgba(255,255,255,0.8)";

    ctx.shadowBlur = 8;

    ctx.shadowColor =
        "rgba(255,255,255,0.35)";

    ctx.stroke();

    ctx.shadowBlur = 0;
}

drawVisualizer();


/* =========================================================
   ▶️ START VISUALIZER
========================================================= */

audio.addEventListener(
    "play",
    function () {

        setupVisualizer();

        if (
            audioContext &&
            audioContext.state ===
            "suspended"
        ) {

            audioContext.resume();

        }

    }
);


/* =========================================================
   🚀 START
========================================================= */

loadSong(0);
