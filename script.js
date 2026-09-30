// =====================================================
// CAFE BEATS - COMPLETE SCRIPT
// =====================================================


// =====================================================
// SONGS
// =====================================================

const songs = [
    { title: "Be Intehaan", artist: "Atif Aslam", file: "song2.mp3" },
    { title: "Darkhast X Monsoon Mashup", artist: "Artist Name", file: "song3.mp3" },
    { title: "Woh Lamhe", artist: "Atif Aslam", file: "song4.mp3" },
    { title: "Jenna Jenna", artist: "Artist 5", file: "song5.mp3" },
    { title: "Pehli Dafa", artist: "Artist 6", file: "song6.mp3" },
    { title: "O Satthi", artist: "Artist 7", file: "song7.mp3" },
    { title: "Shyd Kabhi Na Kah Saku", artist: "Artist 8", file: "song8.mp3" },
    { title: "Channa Mereya", artist: "Artist 9", file: "song9.mp3" },
    { title: "Juda Hoke Bhi", artist: "Artist 10", file: "song10.mp3" },
    { title: "Main Rang Sharbaton Ka", artist: "Artist 11", file: "song11.mp3" },
    { title: "Mujhe Penne Do", artist: "Artist 12", file: "song12.mp3" },
    { title: "Tera Zikr", artist: "Artist 13", file: "song13.mp3" },
    { title: "Bargad", artist: "Artist 14", file: "song14.mp3" },
    { title: "Tere Liye", artist: "Artist 15", file: "song15.mp3" },
    { title: "Oo Rangrez", artist: "Artist 16", file: "song16.mp3" },
    { title: "Samjho Na", artist: "Artist 17", file: "song17.mp3" },
    { title: "Star Boy", artist: "Artist 18", file: "song18.mp3" },
    { title: "Sailor", artist: "Artist 19", file: "song19.mp3" },
    { title: "Memories", artist: "Artist 20", file: "song20.mp3" },
    { title: "Falling", artist: "", file: "song21.mp3" },
    { title: "Heat Waves", artist: "", file: "song22.mp3" },
    { title: "Dandelions", artist: "", file: "song23.mp3" },
    { title: "Sing for the Moment", artist: "", file: "song24.mp3" },
    { title: "Darkside", artist: "", file: "song25.mp3" },
    { title: "Somewhere We Only Know", artist: "", file: "song26.mp3" },
    { title: "Snap", artist: "", file: "song27.mp3" },
    { title: "Her", artist: "", file: "song28.mp3" },
    { title: "I Guess", artist: "", file: "song29.mp3" },
    { title: "Departure Lane", artist: "", file: "song30.mp3" }
];


// =====================================================
// PLAYER ELEMENTS
// =====================================================

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const playerImage = document.getElementById("playerImage");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

let currentSongIndex = 0;
let shuffle = false;


// =====================================================
// LOAD SONG
// =====================================================

function loadSong(index) {

    currentSongIndex = index;

    const song = songs[currentSongIndex];

    audio.src = "./" + song.file;

    songTitle.textContent = song.title;
    artist.textContent = song.artist;

    playerImage.src =
        "https://picsum.photos/60?random=" +
        (currentSongIndex + 2);

    progress.value = 0;

    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
}


// =====================================================
// PLAY / PAUSE
// =====================================================

function togglePlay() {

    if (audio.paused) {

        audio.play()
            .then(function () {

                playBtn.textContent = "⏸";

            })
            .catch(function (error) {

                console.error("Audio error:", error);

            });

    } else {

        audio.pause();

        playBtn.textContent = "▶";
    }
}


// =====================================================
// NEXT SONG
// =====================================================

function nextSong() {

    if (shuffle) {

        let newIndex;

        do {

            newIndex =
                Math.floor(
                    Math.random() * songs.length
                );

        } while (
            newIndex === currentSongIndex &&
            songs.length > 1
        );

        currentSongIndex = newIndex;

    } else {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {

            currentSongIndex = 0;

        }
    }

    loadSong(currentSongIndex);

    audio.play()
        .then(function () {

            playBtn.textContent = "⏸";

        })
        .catch(function (error) {

            console.error("Audio error:", error);

        });
}


// =====================================================
// PREVIOUS SONG
// =====================================================

function previousSong() {

    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex =
            songs.length - 1;

    }

    loadSong(currentSongIndex);

    audio.play()
        .then(function () {

            playBtn.textContent = "⏸";

        })
        .catch(function (error) {

            console.error("Audio error:", error);

        });
}


// =====================================================
// AUTO NEXT
// =====================================================

audio.addEventListener(
    "ended",
    function () {

        nextSong();

    }
);


// =====================================================
// PROGRESS BAR
// =====================================================

audio.addEventListener(
    "loadedmetadata",
    function () {

        if (!isNaN(audio.duration)) {

            progress.max =
                audio.duration;

            duration.textContent =
                formatTime(audio.duration);
        }

    }
);


audio.addEventListener(
    "timeupdate",
    function () {

        if (!isNaN(audio.duration)) {

            progress.value =
                audio.currentTime;

            currentTime.textContent =
                formatTime(audio.currentTime);
        }

    }
);


progress.addEventListener(
    "input",
    function () {

        audio.currentTime =
            progress.value;

    }
);


// =====================================================
// TIME FORMAT
// =====================================================

function formatTime(time) {

    if (isNaN(time)) {

        return "0:00";

    }

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60)
            .toString()
            .padStart(2, "0");

    return minutes + ":" + seconds;
}


// =====================================================
// VOLUME
// =====================================================

volume.addEventListener(
    "input",
    function () {

        audio.volume =
            volume.value;

    }
);

audio.volume = 1;


// =====================================================
// SHUFFLE
// =====================================================

function toggleShuffle() {

    shuffle = !shuffle;

    const shuffleBtn =
        document.getElementById(
            "shuffleBtn"
        );

    if (shuffle) {

        shuffleBtn.textContent =
            "🔀 ON";

        shuffleBtn.classList.add(
            "active"
        );

    } else {

        shuffleBtn.textContent =
            "🔀";

        shuffleBtn.classList.remove(
            "active"
        );
    }
}


// =====================================================
// THEME
// =====================================================

function toggleTheme() {

    document.body.classList.toggle(
        "light"
    );

    const themeBtn =
        document.getElementById(
            "themeToggle"
        );

    if (
        document.body.classList.contains(
            "light"
        )
    ) {

        themeBtn.textContent = "🌙";

    } else {

        themeBtn.textContent = "☀️";
    }
}


// =====================================================
// LIVE CLOCK
// =====================================================

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
        now.getMinutes()
            .toString()
            .padStart(2, "0");

    const seconds =
        now.getSeconds()
            .toString()
            .padStart(2, "0");

    const ampm =
        hours >= 12
            ? "PM"
            : "AM";

    hours =
        hours % 12 || 12;

    clock.textContent =
        hours + ":" +
        minutes + ":" +
        seconds + " " +
        ampm;
}

setInterval(
    updateClock,
    1000
);

updateClock();


// =====================================================
// SLEEP TIMER
// =====================================================

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

    const minutes =
        Number(select.value);

    if (sleepTimer) {

        clearTimeout(
            sleepTimer
        );

        sleepTimer = null;
    }

    if (minutes === 0) {

        status.textContent = "";

        return;
    }

    status.textContent =
        "Ends in " +
        minutes +
        " min";

    sleepTimer =
        setTimeout(
            function () {

                audio.pause();

                playBtn.textContent =
                    "▶";

                status.textContent =
                    "Sleep timer ended";

            },
            minutes *
            60 *
            1000
        );
}


// =====================================================
// ONLINE COUNTER
// =====================================================

const onlineCount =
    document.getElementById(
        "onlineCount"
    );

if (onlineCount) {

    onlineCount.textContent =
        "1";
}


// =====================================================
// WAVE VISUALIZER
//
// MANY CONNECTED WAVES
// BIG → SMALL → BIG → SMALL
// BIG → BIG → BIG → SMALL
//
// ALL WAVES ABOVE ONE BASELINE
// =====================================================

const canvas =
    document.getElementById(
        "visualizer"
    );

if (canvas) {

    const ctx =
        canvas.getContext("2d");

    let waveTime = 0;


    // -------------------------------------------------
    // HEIGHT PATTERN
    // -------------------------------------------------

    const peakPattern = [
        0.95,
        0.30,
        0.75,
        0.25,
        0.90,
        0.35,
        0.70,
        0.25,
        0.95,
        0.85,
        0.95,
        0.90,
        0.30,
        0.75,
        0.25,
        0.90,
        0.35,
        0.80,
        0.25,
        0.95,
        0.85,
        0.90,
        0.30,
        0.70,
        0.25,
        0.90,
        0.35,
        0.80,
        0.25,
        0.95
    ];


    function drawVisualizer() {

        requestAnimationFrame(
            drawVisualizer
        );


        // -------------------------------------------------
        // CANVAS SIZE
        // -------------------------------------------------

        canvas.width =
            canvas.clientWidth;

        canvas.height =
            canvas.clientHeight;

        const width =
            canvas.width;

        const height =
            canvas.height;


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        // -------------------------------------------------
        // BASELINE
        // -------------------------------------------------

        const baseY =
            height * 0.84;


        ctx.beginPath();

        ctx.moveTo(
            0,
            baseY
        );

        ctx.lineTo(
            width,
            baseY
        );

        ctx.lineWidth = 1.5;

        ctx.strokeStyle =
            "rgba(255,255,255,0.30)";

        ctx.shadowBlur = 0;

        ctx.stroke();


        // -------------------------------------------------
        // CONNECTED WAVE
        // -------------------------------------------------

        const points = 360;

        ctx.beginPath();


        for (
            let i = 0;
            i < points;
            i++
        ) {

            const position =
                i /
                (points - 1);


            // -------------------------------------------------
            // OVERALL SHAPE
            // SMALL → BIG → SMALL
            // -------------------------------------------------

            const envelope =
                Math.sin(
                    position *
                    Math.PI
                );


            // -------------------------------------------------
            // SELECT PEAK HEIGHT
            // -------------------------------------------------

            const exactIndex =
                position *
                (peakPattern.length - 1);

            const index =
                Math.floor(
                    exactIndex
                );

            const nextIndex =
                Math.min(
                    index + 1,
                    peakPattern.length - 1
                );

            const local =
                exactIndex -
                index;


            // Smooth interpolation
            const smooth =
                local *
                local *
                (3 - 2 * local);


            const heightPattern =
                peakPattern[index] +
                (
                    peakPattern[nextIndex] -
                    peakPattern[index]
                ) *
                smooth;


            // -------------------------------------------------
            // MANY SMALL CONNECTED PEAKS
            // -------------------------------------------------

            const smallWave =
                Math.abs(
                    Math.sin(
                        position *
                        Math.PI *
                        34 +
                        waveTime
                    )
                );


            // -------------------------------------------------
            // FINAL HEIGHT
            // -------------------------------------------------

            const amplitude =
                height *
                0.58 *
                envelope *
                heightPattern;


            // ALWAYS ABOVE BASELINE
            const y =
                baseY -
                smallWave *
                amplitude;


            const x =
                position *
                width;


            // -------------------------------------------------
            // DRAW SMOOTH CURVE
            // -------------------------------------------------

            if (i === 0) {

                ctx.moveTo(
                    x,
                    y
                );

            } else {

                const previousPosition =
                    (i - 1) /
                    (points - 1);


                const previousEnvelope =
                    Math.sin(
                        previousPosition *
                        Math.PI
                    );


                const previousExactIndex =
                    previousPosition *
                    (peakPattern.length - 1);


                const previousIndex =
                    Math.floor(
                        previousExactIndex
                    );


                const previousNextIndex =
                    Math.min(
                        previousIndex + 1,
                        peakPattern.length - 1
                    );


                const previousLocal =
                    previousExactIndex -
                    previousIndex;


                const previousSmooth =
                    previousLocal *
                    previousLocal *
                    (
                        3 -
                        2 *
                        previousLocal
                    );


                const previousPattern =
                    peakPattern[
                        previousIndex
                    ] +
                    (
                        peakPattern[
                            previousNextIndex
                        ] -
                        peakPattern[
                            previousIndex
                        ]
                    ) *
                    previousSmooth;


                const previousWave =
                    Math.abs(
                        Math.sin(
                            previousPosition *
                            Math.PI *
                            34 +
                            waveTime
                        )
                    );


                const previousY =
                    baseY -
                    previousWave *
                    height *
                    0.58 *
                    previousEnvelope *
                    previousPattern;


                const previousX =
                    previousPosition *
                    width;


                const controlX =
                    (
                        previousX +
                        x
                    ) / 2;


                ctx.quadraticCurveTo(
                    controlX,
                    previousY,
                    x,
                    y
                );
            }
        }


        // -------------------------------------------------
        // WAVE STYLE
        // -------------------------------------------------

        ctx.lineWidth = 2.4;

        ctx.lineCap =
            "round";

        ctx.lineJoin =
            "round";

        ctx.strokeStyle =
            "rgba(255,255,255,0.90)";

        ctx.shadowBlur = 7;

        ctx.shadowColor =
            "rgba(255,255,255,0.25)";

        ctx.stroke();


        // -------------------------------------------------
        // ANIMATION
        // -------------------------------------------------

        waveTime += 0.025;
    }


    drawVisualizer();
}


// =====================================================
// START FIRST SONG
// =====================================================

loadSong(0);
