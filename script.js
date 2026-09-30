// =============================
// SMOOTH WAVE VISUALIZER
// =============================

const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

let audioContext;
let analyser;
let source;
let dataArray;

function setupVisualizer() {
    if (audioContext) return;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    analyser = audioContext.createAnalyser();

    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.97;

    source = audioContext.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    dataArray = new Uint8Array(analyser.frequencyBinCount);

    drawVisualizer();
}

function drawVisualizer() {

    requestAnimationFrame(drawVisualizer);

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    analyser.getByteTimeDomainData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const points = 70;
    const step = Math.floor(dataArray.length / points);

    ctx.beginPath();

    let firstX = 0;
    let firstY = canvas.height / 2;

    for (let i = 0; i < points; i++) {

        const index = i * step;

        const value = (dataArray[index] - 128) / 128;

        // Low amplitude = clean small waves
        const amplitude = canvas.height * 0.18;

        const x = (i / (points - 1)) * canvas.width;
        const y = canvas.height / 2 + value * amplitude;

        if (i === 0) {
            ctx.moveTo(x, y);

            firstX = x;
            firstY = y;
        } else {

            const previousX =
                ((i - 1) / (points - 1)) * canvas.width;

            const previousIndex =
                Math.max(0, (i - 1) * step);

            const previousValue =
                (dataArray[previousIndex] - 128) / 128;

            const previousY =
                canvas.height / 2 +
                previousValue * amplitude;

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

    ctx.lineWidth = 2.5;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.shadowBlur = 8;

    ctx.strokeStyle = "rgba(255,255,255,0.8)";

    ctx.stroke();
}


// Start visualizer when music plays
audio.addEventListener("play", () => {

    setupVisualizer();

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

});
