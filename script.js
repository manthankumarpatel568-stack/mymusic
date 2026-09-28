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


    document.getElementById(
        "liveClock"
    ).textContent =
        `${hours}:${minutes}:${seconds} ${ampm}`;

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

        image:
            "https://picsum.photos/60?random=2"
    },


    {
        title:
            "Darkhast X Monsoon Mashup",

        artist:
            "Artist Name",

        file:
            "song3.mp3",

        image:
            "https://picsum.photos/60?random=3"
    },


    {
        title:
            "Woh Lamhe",

        artist:
            "Atif Aslam",

        file:
            "song4.mp3",

        image:
            "https://picsum.photos/60?random=4"
    },


    {
        title:
            "Song 5",

        artist:
            "Artist 5",

        file:
            "song5.mp3",

        image:
            "https://picsum.photos/60?random=5"
    },


    {
        title:
            "Song 6",

        artist:
            "Artist 6",

        file:
            "song6.mp3",

        image:
            "https://picsum.photos/60?random=6"
    },


    {
        title:
            "Song 7",

        artist:
            "Artist 7",

        file:
            "song7.mp3",

        image:
            "https://picsum.photos/60?random=7"
    },


    {
        title:
            "Song 8",

        artist:
            "Artist 8",

        file:
            "song8.mp3",

        image:
            "https://picsum.photos/60?random=8"
    },


    {
        title:
            "Song 9",

        artist:
            "Artist 9",

        file:
            "song9.mp3",

        image:
            "https://picsum.photos/60?random=9"
    }

];


let currentSong = 0;


/* =====================================
   CANVAS VISUALIZER
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
   SET CANVAS SIZE
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
   START AUDIO ANALYSER
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
                "Web Audio API not supported."
            );

            return false;
        }


        audioContext =
            new AudioContext();


        analyser =
            audioContext.createAnalyser();


        analyser.fftSize = 256;


        analyser.smoothingTimeConstant =
            0.75;


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

    } catch (error) {

        console.error(
            "Visualizer setup error:",
            error
        );


        return false;
    }
}


/* =====================================
   DRAW WAVE
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


    /* CENTER LINE */

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
        "rgba(255,255,255,0.12)";

    ctx.stroke();


    /* NO AUDIO YET */

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


    /* WAVE */

    ctx.beginPath();


    const sliceWidth =
        width / bufferLength;


    let x = 0;


    for (
        let i = 0;
        i < bufferLength;
        i++
    ) {

        const value =
            dataArray[i] / 128.0;


        const y =
            (value * height) / 2;


        if (i === 0) {

            ctx.moveTo(
                x,
                y
            );

        } else {

            ctx.lineTo(
                x,
                y
            );
        }


        x += sliceWidth;
    }


    ctx.lineWidth = 3;


    if (
        document.body.classList.contains(
            "light-theme"
        )
    ) {

        ctx.strokeStyle =
            "rgba(20,20,20,0.9)";

    } else {

        ctx.strokeStyle =
            "rgba(255,255,255,0.95)";
    }


    ctx.shadowBlur = 12;


    if (
        document.body.classList.contains(
            "light-theme"
        )
    ) {

        ctx.shadowColor =
            "rgba(0,0,0,0.4)";

    } else {

        ctx.shadowColor =
            "rgba(255,255,255,0.8)";
    }


    ctx.stroke();


    ctx.shadowBlur = 0;
}


/* =====================================
   PLAY SONG
===================================== */

function playSong(index) {

    currentSong = index;


    /*
       Create analyser from a user action
       before starting the audio.
    */

    setupVisualizer();


    if (
        audioContext &&
        audioContext.state === "suspended"
    ) {

        audioContext.resume();
    }


    audio.src =
        songs[currentSong].file;


    document.getElementById(
        "songTitle"
    ).textContent =
        songs[currentSong].title;


    document.getElementById(
        "artist"
    ).textContent =
        songs[currentSong].artist;


    document.getElementById(
        "playerImage"
    ).src =
        songs[currentSong].image;


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

    if (audio.paused) {

        setupVisualizer();


        if (
            audioContext &&
            audioContext.state === "suspended"
        ) {

            audioContext.resume();
        }


        if (
            !audio.src ||
            audio.src === window.location.href
        ) {

            playSong(currentSong);

            return;
        }


        audio.play()
            .catch(function(error) {

                console.error(
                    "Playback error:",
                    error
                );

            });

    } else {

        audio.pause();
    }
}


/* =====================================
   NEXT SONG
===================================== */

function nextSong() {

    currentSong++;


    if (
        currentSong >= songs.length
    ) {

        currentSong = 0;
    }


    playSong(currentSong);
}


/* =====================================
   PREVIOUS SONG
===================================== */

function previousSong() {

    currentSong--;


    if (currentSong < 0) {

        currentSong =
            songs.length - 1;
    }


    playSong(currentSong);
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


        document.getElementById(
            "currentTime"
        ).textContent =
            formatTime(
                audio.currentTime
            );

    }
);


/* =====================================
   DURATION
===================================== */

audio.addEventListener(
    "loadedmetadata",
    function() {

        document.getElementById(
            "duration"
        ).textContent =
            formatTime(
                audio.duration
            );

    }
);


/* =====================================
   PROGRESS BAR
===================================== */

document.getElementById(
    "progress"
).addEventListener(
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
                    this.value / 100
                ) *
                audio.duration;
        }

    }
);


/* =====================================
   VOLUME
===================================== */

document.getElementById(
    "volume"
).addEventListener(
    "input",
    function() {

        audio.volume =
            Number(this.value);

    }
);


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

        document.getElementById(
            "playBtn"
        ).textContent = "▶";

    }
);


audio.addEventListener(
    "play",
    function() {

        document.getElementById(
            "playBtn"
        ).textContent = "⏸";

    }
);


/* =====================================
   FORMAT TIME
===================================== */

function formatTime(seconds) {

    if (
        !Number.isFinite(seconds)
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
