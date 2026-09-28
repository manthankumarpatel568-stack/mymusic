/* =====================================
   FIREBASE
===================================== */

const firebaseConfig = {

    apiKey: "AIzaSyDFdJAqe-g1EXo5qPYpLkoXd23xVrt78S0",

    authDomain:
        "cafe-beats-6ba81.firebaseapp.com",

    projectId:
        "cafe-beats-6ba81",

    storageBucket:
        "cafe-beats-6ba81.firebasestorage.app",

    messagingSenderId:
        "375478395425",

    appId:
        "1:375478395425:web:9ce597e11cfd5c212ef960",

    measurementId:
        "G-WTCQGJ5F24"
};


/* =====================================
   START FIREBASE
===================================== */

firebase.initializeApp(firebaseConfig);

const database =
    firebase.database();

const onlineUsersRef =
    database.ref("onlineUsers");

const connectedRef =
    database.ref(".info/connected");


/* =====================================
   ONLINE USERS
===================================== */

connectedRef.on("value", function(snapshot) {

    if (snapshot.val() === true) {

        const userRef =
            onlineUsersRef.push();

        userRef
            .onDisconnect()
            .remove()
            .then(function() {

                return userRef.set(true);

            })
            .catch(function(error) {

                console.error(
                    "Presence error:",
                    error
                );

            });
    }

});


onlineUsersRef.on("value", function(snapshot) {

    const count =
        snapshot.numChildren();

    const counter =
        document.getElementById(
            "onlineCount"
        );

    if (counter) {

        counter.textContent =
            count;

    }

});


/* =====================================
   LIVE CLOCK
===================================== */

function updateClock() {

    const now =
        new Date();

    let hours =
        now.getHours();

    let minutes =
        now.getMinutes();

    let seconds =
        now.getSeconds();

    let ampm =
        hours >= 12
            ? "PM"
            : "AM";

    hours =
        hours % 12;

    if (hours === 0) {

        hours = 12;

    }

    minutes =
        minutes
            .toString()
            .padStart(2, "0");

    seconds =
        seconds
            .toString()
            .padStart(2, "0");

    const clock =
        document.getElementById(
            "liveClock"
        );

    if (clock) {

        clock.textContent =
            `${hours}:${minutes}:${seconds} ${ampm}`;

    }

}


updateClock();

setInterval(
    updateClock,
    1000
);


/* =====================================
   AUDIO
===================================== */

const audio =
    document.getElementById("audio");


/* =====================================
   SONGS
===================================== */

const songs = [

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
    },

    {
        title: "Woh Lamhe",
        artist: "Atif Aslam",
        file: "song4.mp3",
        image: "https://picsum.photos/60?random=4"
    },

    {
        title: "Song 5",
        artist: "Artist 5",
        file: "song5.mp3",
        image: "https://picsum.photos/60?random=5"
    },

    {
        title: "Song 6",
        artist: "Artist 6",
        file: "song6.mp3",
        image: "https://picsum.photos/60?random=6"
    },

    {
        title: "Song 7",
        artist: "Artist 7",
        file: "song7.mp3",
        image: "https://picsum.photos/60?random=7"
    },

    {
        title: "Song 8",
        artist: "Artist 8",
        file: "song8.mp3",
        image: "https://picsum.photos/60?random=8"
    },

    {
        title: "Song 9",
        artist: "Artist 9",
        file: "song9.mp3",
        image: "https://picsum.photos/60?random=9"
    }

];


let currentSong = 0;


/* =====================================
   VISUALIZER
===================================== */

const canvas =
    document.getElementById(
        "visualizer"
    );

const ctx =
    canvas.getContext("2d");


let audioContext = null;

let analyser = null;

let audioSource = null;

let visualizerReady = false;


/* =====================================
   RESIZE CANVAS
===================================== */

function resizeCanvas() {

    const ratio =
        window.devicePixelRatio || 1;

    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;

    canvas.width =
        width * ratio;

    canvas.height =
        height * ratio;

    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =====================================
   SETUP AUDIO VISUALIZER
===================================== */

function setupVisualizer() {

    if (visualizerReady) {

        return true;

    }

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {

            console.error(
                "Web Audio API is not supported."
            );

            return false;

        }


        audioContext =
            new AudioContext();


        analyser =
            audioContext.createAnalyser();


        /* MORE POINTS = SMOOTHER WAVE */

        analyser.fftSize = 512;


        /* SMOOTH AUDIO MOVEMENT */

        analyser.smoothingTimeConstant =
            0.88;


        audioSource =
            audioContext.createMediaElementSource(
                audio
            );


        audioSource.connect(
            analyser
        );


        analyser.connect(
            audioContext.destination
        );


        visualizerReady = true;


        drawWave();


        return true;

    }
    catch (error) {

        console.error(
            "Visualizer setup error:",
            error
        );

        return false;

    }

}


/* =====================================
   SMOOTH MUSIC WAVE
===================================== */

function drawWave() {

    requestAnimationFrame(
        drawWave
    );


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


    /* =================================
       CENTER LINE
    ================================= */

    ctx.beginPath();

    ctx.moveTo(
        0,
        height / 2
    );

    ctx.lineTo(
        width,
        height / 2
    );

    ctx.lineWidth = 1;

    ctx.strokeStyle =
        "rgba(255,255,255,0.08)";

    ctx.stroke();


    /* =================================
       WAIT FOR AUDIO
    ================================= */

    if (!analyser) {

        return;

    }


    const bufferLength =
        analyser.fftSize;


    const dataArray =
        new Uint8Array(
            bufferLength
        );


    analyser.getByteTimeDomainData(
        dataArray
    );


    /* =================================
       SMOOTH WAVE
    ================================= */

    ctx.beginPath();


    const centerY =
        height / 2;


    const step =
        width /
        (bufferLength - 1);


    let previousY =
        centerY;


    for (
        let i = 0;
        i < bufferLength;
        i++
    ) {

        /* AUDIO VALUE */

        const value =
            (dataArray[i] - 128) /
            128;


        /* REDUCED HEIGHT
           = CLEANER LOOK */

        const targetY =
            centerY +
            value *
            (height * 0.32);


        /* EXTRA SMOOTHING */

        const smoothness =
            0.15;


        const y =
            previousY +
            (
                targetY -
                previousY
            ) *
            smoothness;


        const x =
            i * step;


        if (i === 0) {

            ctx.moveTo(
                x,
                y
            );

        }
        else {

            /* CURVED WAVE */

            const previousX =
                (i - 1) * step;


            const controlX =
                (previousX + x) / 2;


            ctx.quadraticCurveTo(
                controlX,
                previousY,
                x,
                y
            );

        }


        previousY =
            y;

    }


    /* =================================
       WAVE APPEARANCE
    ================================= */

    ctx.lineWidth = 3;

    ctx.lineCap =
        "round";

    ctx.lineJoin =
        "round";


    /* DARK / LIGHT */

    if (
        document.body.classList.contains(
            "light-theme"
        )
    ) {

        ctx.strokeStyle =
            "rgba(25,25,25,0.9)";

        ctx.shadowColor =
            "rgba(0,0,0,0.35)";

    }
    else {

        ctx.strokeStyle =
            "rgba(255,255,255,0.95)";

        ctx.shadowColor =
            "rgba(255,255,255,0.75)";

    }


    /* SOFT GLOW */

    ctx.shadowBlur = 10;


    ctx.stroke();


    ctx.shadowBlur = 0;

}


/* =====================================
   PLAY SONG
===================================== */

function playSong(index) {

    currentSong =
        index;


    setupVisualizer();


    if (
        audioContext &&
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();

    }


    audio.src =
        songs[currentSong].file;


    const title =
        document.getElementById(
            "songTitle"
        );


    const artist =
        document.getElementById(
            "artist"
        );


    const image =
        document.getElementById(
            "playerImage"
        );


    if (title) {

        title.textContent =
            songs[currentSong].title;

    }


    if (artist) {

        artist.textContent =
            songs[currentSong].artist;

    }


    if (image) {

        image.src =
            songs[currentSong].image;

    }


    audio.play()
        .catch(function(error) {

            console.error(
                "Playback error:",
                error
            );

        });

}


/* =====================================
   PLAY / PAUSE
===================================== */

function togglePlay() {

    setupVisualizer();


    if (
        audioContext &&
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();

    }


    if (audio.paused) {

        if (
            !audio.src ||
            audio.src ===
            window.location.href
        ) {

            playSong(
                currentSong
            );

            return;

        }


        audio.play()
            .catch(function(error) {

                console.error(
                    "Playback error:",
                    error
                );

            });

    }
    else {

        audio.pause();

    }

}


/* =====================================
   NEXT SONG
===================================== */

function nextSong() {

    currentSong++;


    if (
        currentSong >=
        songs.length
    ) {

        currentSong = 0;

    }


    playSong(
        currentSong
    );

}


/* =====================================
   PREVIOUS SONG
===================================== */

function previousSong() {

    currentSong--;


    if (
        currentSong < 0
    ) {

        currentSong =
            songs.length - 1;

    }


    playSong(
        currentSong
    );

}


/* =====================================
   PROGRESS
===================================== */

audio.addEventListener(
    "timeupdate",
    function() {

        const progress =
            document.getElementById(
                "progress"
            );


        if (
            audio.duration &&
            Number.isFinite(
                audio.duration
            )
        ) {

            progress.value =
                (
                    audio.currentTime /
                    audio.duration
                ) * 100;

        }


        const currentTime =
            document.getElementById(
                "currentTime"
            );


        if (currentTime) {

            currentTime.textContent =
                formatTime(
                    audio.currentTime
                );

        }

    }
);


/* =====================================
   DURATION
===================================== */

audio.addEventListener(
    "loadedmetadata",
    function() {

        const duration =
            document.getElementById(
                "duration"
            );


        if (duration) {

            duration.textContent =
                formatTime(
                    audio.duration
                );

        }

    }
);


/* =====================================
   PROGRESS BAR
===================================== */

const progressBar =
    document.getElementById(
        "progress"
    );


if (progressBar) {

    progressBar.addEventListener(
        "input",
        function() {

            if (
                audio.duration &&
                Number.isFinite(
                    audio.duration
                )
            ) {

                audio.currentTime =
                    (
                        this.value /
                        100
                    ) *
                    audio.duration;

            }

        }
    );

}


/* =====================================
   VOLUME
===================================== */

const volume =
    document.getElementById(
        "volume"
    );


if (volume) {

    volume.addEventListener(
        "input",
        function() {

            audio.volume =
                Number(
                    this.value
                );

        }
    );

}


/* =====================================
   SONG ENDED
===================================== */

audio.addEventListener(
    "ended",
    function() {

        nextSong();

    }
);


/* =====================================
   PLAY ICON
===================================== */

audio.addEventListener(
    "pause",
    function() {

        const playBtn =
            document.getElementById(
                "playBtn"
            );


        if (playBtn) {

            playBtn.textContent =
                "▶";

        }

    }
);


audio.addEventListener(
    "play",
    function() {

        const playBtn =
            document.getElementById(
                "playBtn"
            );


        if (playBtn) {

            playBtn.textContent =
                "⏸";

        }

    }
);


/* =====================================
   FORMAT TIME
===================================== */

function formatTime(
    seconds
) {

    if (
        !Number.isFinite(
            seconds
        )
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    let secs =
        Math.floor(
            seconds % 60
        );


    if (secs < 10) {

        secs =
            "0" + secs;

    }


    return (
        minutes +
        ":" +
        secs
    );

}


/* =====================================
   DARK / LIGHT THEME
===================================== */

function toggleTheme() {

    document.body.classList.toggle(
        "light-theme"
    );


    const button =
        document.getElementById(
            "themeToggle"
        );


    if (!button) {

        return;

    }


    if (
        document.body.classList.contains(
            "light-theme"
        )
    ) {

        button.textContent =
            "🌙";

    }
    else {

        button.textContent =
            "☀️";

    }

}
