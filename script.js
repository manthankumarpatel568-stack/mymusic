// =============================
// WAVES ABOVE ONE FIXED LINE
// =============================

const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

let waveTime = 0;

function drawVisualizer() {

    requestAnimationFrame(drawVisualizer);

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const points = 120;

    // Fixed baseline
    const baseY = height * 0.72;

    ctx.beginPath();

    for (let i = 0; i < points; i++) {

        const position = i / (points - 1);

        // Increasing → maximum → decreasing
        const envelope =
            Math.sin(position * Math.PI);

        // Multiple smooth waves
        const wave =
            Math.abs(
                Math.sin(
                    position * Math.PI * 10 +
                    waveTime
                )
            );

        // Height of wave
        const amplitude =
            height * 0.45 * envelope;

        // IMPORTANT:
        // Always ABOVE the baseline
        const y =
            baseY -
            wave * amplitude;

        const x =
            position * width;

        if (i === 0) {

            ctx.moveTo(x, y);

        } else {

            const previousPosition =
                (i - 1) / (points - 1);

            const previousEnvelope =
                Math.sin(
                    previousPosition * Math.PI
                );

            const previousWave =
                Math.abs(
                    Math.sin(
                        previousPosition *
                        Math.PI *
                        10 +
                        waveTime
                    )
                );

            const previousX =
                previousPosition * width;

            const previousY =
                baseY -
                previousWave *
                height *
                0.45 *
                previousEnvelope;

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

    ctx.strokeStyle =
        "rgba(255,255,255,0.85)";

    ctx.shadowBlur = 7;

    ctx.shadowColor =
        "rgba(255,255,255,0.25)";

    ctx.stroke();

    waveTime += 0.025;
}

drawVisualizer();
