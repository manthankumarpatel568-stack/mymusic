// =============================
// CLEAN SMOOTH WAVE VISUALIZER
// =============================

const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

let audioContext = null;
let analyser = null;
let source = null;
let dataArray = null;
let visualizerStarted = false;

function setupVisualizer() {

    if (visualizerStarted) return;

    visualizerStarted = true;

    audioContext = new (
        window.AudioContext ||
        window.webkitAudioContext
    )();

    analyser = audioContext.createAnalyser();

    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.98;

    source = audioContext.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    dataArray = new Uint8Array(analyser.fftSize);

    drawVisualizer();
}


function drawVisualizer() {

    requestAnimationFrame(drawVisualizer);

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width;
    canvas.height = height;

    analyser.getByteTimeDomainData(dataArray);

    ctx.clearRect(0, 0, width, height);

    // Number of points
    const points = 70;

    // Reduce the original audio movement
    const amplitude = height * 0.10;

    let values = [];

    for (let i = 0; i < points; i++) {

        const index = Math.floor(
            i * dataArray.length / points
        );

        let value =
            (dataArray[index] - 128) / 128;

        // Make the movement softer
        value *= 0.55;

        values.push(value);
    }


    // Extra smoothing between nearby points
    for (let pass = 0; pass < 3; pass++) {

        const smooth = [...values];

        for (let i = 1; i < values.length - 1; i++) {

            smooth[i] =
                (values[i - 1] +
                 values[i] * 2 +
                 values[i + 1]) / 4;
        }

        values = smooth;
    }


    // Draw wave
    ctx.beginPath();

    for (let i = 0; i < points; i++) {

        const x =
            (i / (points - 1)) * width;

        const y =
            height / 2 +
            values[i] * amplitude;

        if (i === 0) {

            ctx.moveTo(x, y);

        } else {

            const previousX =
                ((i - 1) / (points - 1)) * width;

            const previousY =
                height / 2 +
                values[i - 1] * amplitude;

            const controlX =
                (previousX + x) / 2;

            ctx.quadraticCurveTo(
                controlX,
                previousY,
                x,
                y
            );
        }
    }


    // Clean thin line
    ctx.lineWidth = 2.5;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.strokeStyle =
        "rgba(255,255,255,0.85)";

    ctx.shadowBlur = 6;

    ctx.shadowColor =
        "rgba(255,255,255,0.25)";

    ctx.stroke();
}


// Start when music plays
audio.addEventListener("play", () => {

    setupVisualizer();

    if (
        audioContext &&
        audioContext.state === "suspended"
    ) {
        audioContext.resume();
    }

});
