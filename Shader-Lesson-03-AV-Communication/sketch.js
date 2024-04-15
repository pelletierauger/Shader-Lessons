let looping = true;
let keysActive = true;
let socket, cnvs, gl, shaderProgram, time, resolution, frequency, amplitude;
let scdFrequency = 0;
let scdAmplitude = 0;
let drawCount = 0, drawIncrement = 1;
let vbuffer;

function setup() {
    socket = io.connect('http://localhost:8080');
    socket.on('receiveOSC', function(data) {
        // console.log(data.args);
        // console.log(data.args[0].value);
        scdFrequency = data.args[0].value;
        scdAmplitude = 1;
    });
    pixelDensity(1);
    noCanvas();
    cnvs = document.getElementById('cnvs');
    cnvs.width = window.innerWidth;
    cnvs.height = window.innerHeight;
    gl = cnvs.getContext('webgl', { preserveDrawingBuffer: true });
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(false);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.viewport(0, 0, cnvs.width, cnvs.height);
    vbuffer = gl.createBuffer();
    frameRate(20);
    background(0);
    fill(255, 50);
    noStroke();
    // A simple circle
    setBothShaders(`
    // beginGLSL
    precision mediump float;
    varying vec2 vTexCoord;
    uniform float time;
    uniform vec2 resolution;
    uniform float frequency;
    uniform float amplitude;
    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    float circle(vec2 p, float radius, float smoothness) {
        float r = radius * 0.5;
        float ratio = resolution.y / resolution.x;
        float c = length(vec2(p.x / ratio, p.y)) - r;
        return smoothstep(r + smoothness + 1e-7, r, c);
    }
    void main() {
        vec2 uv = gl_FragCoord.xy / resolution;
        float size = map(frequency, 0., 1200., 0., 0.25);
        // uv.x = uv.x + sin(time * 0.5 + uv.y * 5e1) * 0.01;
        float c = circle(uv - vec2(0. + size * 3., 0.5), size, 0.05);
        gl_FragColor = vec4(vec3(c) * amplitude, 1.0);
    }
    // endGLSL
    `);
    setRectangle();
    setTimeout(function() {
        scdConsoleArea.setAttribute("style", "display:block;");
        scdArea.style.display = "none";
        scdConsoleArea.setAttribute("style", "display:none;");
        jsCmArea.style.height = "685px";
        jsArea.style.display = "block";
        displayMode = "js";
        javaScriptEditor.cm.refresh();
    }, 1);
    if (!looping) {
        noLoop();
    }
}

draw = function() {
    gl.uniform1f(time, drawCount);
    gl.uniform2f(resolution, cnvs.width, cnvs.height);
    gl.uniform1f(frequency, scdFrequency);
    gl.uniform1f(amplitude, scdAmplitude);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    drawCount += drawIncrement;
    scdAmplitude = Math.max(0, scdAmplitude - 0.15);
}

function keyPressed() {
    if (keysActive) {
        if (keyCode === 32) {
            if (looping) {
                noLoop();
                looping = false;
            } else {
                loop();
                looping = true;
            }
        }
    }
}