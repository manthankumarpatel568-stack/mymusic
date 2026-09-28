/* =====================================
   FIREBASE
===================================== */

const firebaseConfig = {

    apiKey: "AIzaSyDFdJAqe-g1EXo5qPYlLkoXd23xVrt78S0",

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
   REAL-TIME ONLINE USERS
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
   MUSIC PLAYER
===================================== */

const audio =
    document.getElementById("audio");


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
        title: "Woh Lamhe",

        artist: "Atif Aslam",

        file: "song4.mp3",

        image:
            "https://picsum.photos/60?random=4"
    },


    {
        title: "Song 5",

        artist: "Artist 5",

        file: "song5.mp3",

        image:
            "https://picsum.photos/60?random=5"
    },


    {
        title: "Song 6",

        artist: "Artist 6",

        file: "song6.mp3",

        image:
            "https://picsum.photos/60?random=6"
    },


    {
        title: "Song 7",

        artist: "Artist 7",

        file: "song7.mp3",

        image:
            "https://picsum.photos/60?random=7"
    },


    {
        title: "Song 8",

        artist: "Artist 8",

        file: "song8.mp3",

        image:
            "https://picsum.photos/60?random=8"
    },


    {
        title: "Song 9",

        artist: "Artist 9",

        file: "song9.mp3",

        image:
            "https://picsum.photos/60?random=9"
    }

];


let currentSong = 0;


/* =====================================
   PLAY SONG
===================================== */

function playSong(index) {

    currentSong =
        index;


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
        .then(function() {

            document.getElementById(
                "playBtn"
            ).textContent = "⏸";

        })
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

        if (
            !audio.src ||
            audio.src === window.location.href
        ) {

            playSong(currentSong);

            return;
        }


        audio.play()
            .then(function() {

                document.getElementById(
                    "playBtn"
                ).textContent = "⏸";

            })
            .catch(function(error) {

                console.error(
                    "Playback error:",
                    error
                );

            });

    }

    else {

        audio.pause();

        document.getElementById(
            "playBtn"
        ).textContent = "▶";
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
                ) * audio.duration;
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
   PLAY / PAUSE ICON
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
