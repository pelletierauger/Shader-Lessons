let looping = true;
let keysActive = true;
let socket, cnvs, gl, shaderProgram, time, resolution;
let drawCount = 0, drawIncrement = 1;
let vbuffer;

function setup() {
    socket = io.connect('http://localhost:8080');
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
    // Linear gradients
    setBothShaders(`
    // beginGLSL
    precision mediump float;
    #define pi 3.1415926535897932384626433832795
    varying vec2 vTexCoord;
    uniform float time;
    uniform vec2 resolution;
    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    void main() {
        vec2 uv = gl_FragCoord.xy / resolution;
        float ratio = resolution.y / resolution.x;
        uv = uv - 0.5;
        uv.x /= ratio;
        vec3 col = vec3(map(sin(uv.x * 5e1 + time * 0.5), -1.0, 1.0, 0., 1.));
        gl_FragColor = vec4(col, 1.0);
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

function draw() {
    gl.uniform1f(time, drawCount);
    gl.uniform2f(resolution, cnvs.width, cnvs.height);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    drawCount += drawIncrement;
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